<script setup lang="ts">
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { computed, defineAsyncComponent, ref } from 'vue';
import { FirebaseArray } from '@/models/entity';
import { IGame, IGamePlayer, IGameProposal, IGameResponseCard } from '@/models/games';
import { UserDTO } from '@/models/user';
import { GameState } from '@/models/game-state';
import { PlayerState } from '@/models/player-state';
const Hands = defineAsyncComponent(() => import('@/components/Hands.vue'));

const route = useRoute();
const store = useStore();
store.dispatch('setPage', { firstLevelPage: 'In game' });

const gameId = ref<string>(String(route.params.id));
const proposal = ref<IGameProposal>();
// const maxPoint = ref<number>(5);

const currentUser = computed<UserDTO>(() => store.getters['getCurrentUser']);
const games = computed<FirebaseArray<IGame>>(() => store.getters['getGames']);
const game = computed<IGame>(() => games.value[gameId.value]);
const currentHands = computed<FirebaseArray<IGameResponseCard>>(() => Object.fromEntries(Object.entries(game.value.responseCards).filter(([, value]) => value.player === currentUser.value._id)));
const currentPlayer = computed<IGamePlayer>(() => game.value.players[String(currentUser.value._id)]);
const question = computed<string | undefined>(() => game.value.questionCards[game.value.proposals['default'].question].question);

function play() {
  store.dispatch('drawResponseCards', { id: gameId.value, game: game.value });
  store.dispatch('updateState', { id: gameId.value, state: GameState.PLAY });
}

function bossTurn() {
  store.dispatch('updateState', { id: gameId.value, state: GameState.BOSS_TURN });
}

function onHandClick(id: string) {
  if (!proposal.value) {
    proposal.value = { question: game.value.proposals['default'].question, responses: [] };
  }
  if (Number(proposal.value.responses.length) < Number(game.value.questionCards[game.value.proposals['default'].question].nbResponse)) {
    proposal.value.responses.push(id);
  }
}

function formatProposal(prop: IGameProposal): string {
  const question = game.value.questionCards[game.value.proposals['default'].question];
  let questionResponse = String(question.question);
  if (question.nbResponse && prop.responses) {
    const n = Number(question.nbResponse) < Number(prop.responses.length) ? Number(question.nbResponse) : Number(prop.responses.length);
    for (let i = 0; i < n; i++) {
      let resp = String(game.value.responseCards[prop.responses[i]].response);
      if(questionResponse.includes('______')){
        resp = resp.replace(/\.$/, '');
        resp = resp.charAt(0).toLowerCase() + resp.slice(1);
        questionResponse = questionResponse.replace('______', resp);
      } else {
        questionResponse = questionResponse.concat(` ${resp}`)
      }
    }
  }
  return questionResponse;
}

function summitProposal() {
  store.dispatch('addProposal', { gameId: gameId.value, proposalId: currentUser.value._id, proposal: proposal.value });
  const currentPlayerPicked = { [String(currentUser.value._id)]: { ...currentPlayer.value, state: PlayerState.PICKED } };
  store.dispatch('updatePlayers', { id: gameId.value, players: currentPlayerPicked });
  proposal.value = undefined;
}

function resetProposal(prop: IGameProposal | undefined) {
  if (prop) {
    prop.responses = [];
  }
}

function selectProposal(id: string | number) {
  store.dispatch('resetProposals', { id: gameId.value, game: game.value });
  const players = { ...game.value.players };
  Object.keys(players).forEach((key) => (players[key].state = PlayerState.CHOOSING));
  players[id].state = PlayerState.BOSS;
  players[id].point++;
  store.dispatch('updatePlayers', { id: gameId.value, players: players });
  store.dispatch('drawResponseCards', { id: gameId.value, game: game.value });
  store.dispatch('updateState', { id: gameId.value, state: GameState.PLAY });
}

function shuffleArray(array: Array<any>) {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

function shuffleObject(obj: { [key: string]: any }) {
  const result: { [key: string]: any } = {};
  shuffleArray(Object.keys(obj)).forEach((key) => (result[key] = obj[key]));
  return result;
}
</script>

<template>
  <div v-if="game && currentPlayer" class="w-full">
    <div class="block p-2">
      <div v-for="(player, id, i) in game.players" :key="i" class="inline-flex items-center bg-white leading-none rounded-full p-2 shadow text-sm mr-2">
        <span v-if="player.state === 'BOSS'" class="inline-flex bg-purple-600 text-white rounded-full h-6 px-3 justify-center items-center">{{ $t('game.boss') }}</span>
        <span v-if="player.state !== 'BOSS'" :class="{ 'bg-teal-500': player.state === 'CHOOSING', 'bg-lime-500': player.state === 'PICKED' }" class="inline-flex text-white rounded-full h-6 px-3 justify-center items-center">{{
          $t('game.player')
        }}</span>
        <span class="inline-flex px-2">{{ player.pseudo }}</span>
        <span class="inline-flex px-2">{{ player.point }}</span>
      </div>
    </div>

    <div v-if="game.state === 'WAITING' && currentPlayer.state === 'BOSS' && Object.keys(game.players).length > 2" class="flex items-end">
      <!--      <div class="w-32 px-3 mb-2">-->
      <!--        <label for="maxPoint" class="text-xs font-semibold px-1">{{ 'max point' }}</label>-->
      <!--        <div class="flex">-->
      <!--          <select id="maxPoint" v-model="maxPoint" name="vehicle_id" class="w-full px-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500">-->
      <!--            <option disabled value="">Choisissez</option>-->
      <!--            <option value="5">5</option>-->
      <!--            <option value="10">10</option>-->
      <!--            <option value="15">15</option>-->
      <!--            <option value="20">20</option>-->
      <!--          </select>-->
      <!--        </div>-->
      <!--      </div>-->

      <div>
        <button class="m-2 bg-indigo-500 font-semibold text-white px-5 py-2 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring shadow-lg hover:shadow-none transition-all duration-300" @click="play()">
          <span class="px-5">{{ $t('game.start') }}</span>
        </button>
      </div>
    </div>

    <div v-if="game.state === 'PLAY'" class="block p-2">
      <div class="inline-flex items-center bg-slate-800 leading-none text-white rounded-full p-2 shadow h-10">
        <span class="px-3">
          {{ question }}
        </span>
      </div>
    </div>

    <div v-if="game.state === 'PLAY' && proposal" class="block p-2">
      <div class="inline-flex items-center bg-slate-500 leading-none text-white rounded-full p-2 shadow h-10">
        <span class="px-3">
          <fa icon="redo" class="mr-1 hover:text-red-500" @click="resetProposal(proposal)" />
          {{ formatProposal(proposal) }}
        </span>
      </div>
      <button
        v-if="Number(proposal.responses.length) == game.questionCards[proposal.question].nbResponse"
        class="ml-2 bg-indigo-500 font-semibold text-white px-5 py-2 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring shadow-lg hover:shadow-none transition-all duration-300"
        @click="summitProposal()">
        <fa icon="play" />
      </button>
    </div>

    <!-- TODO replace with watcher -->
    <div v-if="game.state === 'PLAY' && currentPlayer.state === 'BOSS' && Object.keys(game.proposals).length === Object.keys(game.players).length">
      <button class="m-2 bg-indigo-500 font-semibold text-white px-5 py-2 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring shadow-lg hover:shadow-none transition-all duration-300" @click="bossTurn()">
        <span class="px-5">{{ $t('game.chose') }}</span>
      </button>
    </div>

    <div v-if="game.state === 'PLAY' && currentPlayer.state === 'CHOOSING'" class="block justify-self-center">
      <hands :items="currentHands" @click="onHandClick($event)" />
    </div>

    <div v-if="game.state === 'BOSS_TURN' || currentPlayer.state === 'PICKED'">
      <div v-for="(prop, id, i) in shuffleObject(game.proposals)" :key="i">
        <div v-if="id !== 'default'" class="block p-2">
          <div class="inline-flex items-center bg-slate-500 leading-none text-white rounded-full p-2 shadow h-10">
            <span class="px-3">
              {{ formatProposal(prop) }}
            </span>
          </div>
          <button
            v-if="currentPlayer.state === 'BOSS'"
            class="ml-2 bg-indigo-500 font-semibold text-white px-5 py-2 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring shadow-lg hover:shadow-none transition-all duration-300"
            @click="selectProposal(id)">
            <fa icon="play" />
          </button>
        </div>
      </div>
    </div>

    <!-- TODO result dashboard -->
    <div v-if="game.state === 'RESULT'"></div>
  </div>
</template>
