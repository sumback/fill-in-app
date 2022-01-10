<script setup lang="ts">
import { computed, defineAsyncComponent, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { QuestionCardDTO, ResponseCardDTO } from '@/models/card';
import { FirebaseArray } from '@/models/entity';
import { IGame } from '@/models/games';
import { UserDTO } from '@/models/user';
const Pagination = defineAsyncComponent(() => import('@/components/Pagination.vue'));

const store = useStore();
const router = useRouter();
store.dispatch('setPage', { firstLevelPage: 'Games' });

const currentPage = ref(1);
const perPage = ref(20);
const pageRange = ref(2);

const games = computed<FirebaseArray<IGame>>(() => store.getters['getGames']);
const currentUser = computed<UserDTO>(() => store.getters['getCurrentUser']);
const questionCards = computed<QuestionCardDTO[]>(() => store.getters['getQuestionCards']);
const responseCards = computed<ResponseCardDTO[]>(() => store.getters['getResponseCards']);
const total = computed(() => (games.value ? Object.keys(games.value).length : 0));

if (!questionCards.value) {
  store.dispatch('loadQuestionCards');
}
if (!responseCards.value) {
  store.dispatch('loadResponseCards');
}

function newGame() {
  store.dispatch('addGame', { host: currentUser.value, questionCards: questionCards.value, responseCards: responseCards.value });
  router.push({ name: 'game', params: { id: currentUser.value._id } });
}

function deleteGame(id: string) {
  store.dispatch('deleteGame', id);
}

function joinGame(id: string | number) {
  if (!games.value[id].players[String(currentUser.value._id)]) {
    store.dispatch('addPlayer', { id: id, player: currentUser.value });
  }
  router.push({ name: 'game', params: { id: id } });
}

function cantJoinGame(id: string | number) {
  return (games.value[id].state !== 'WAITING' || !currentUser.value) && !games.value[id].players[String(currentUser.value._id)];
}

function displayRow(index: number) {
  return index + 1 > (currentPage.value - 1) * perPage.value && index + 1 <= currentPage.value * perPage.value;
}
</script>

<!-- TODO responsive -->
<template>
  <div class="flex items-center justify-center px-5 py-5">
    <div class="w-full lg:w-9/12 py-5 px-5 bg-gray-100 rounded-2xl shadow-xl z-20">
      <div class="container mx-auto py-6 px-4">
        <h1 class="text-2xl text-gray-400 border-b border-gray border-solid">
          <span class="mr-5">{{ $t('games.title') }}</span>
          <button
            :disabled="!currentUser || !questionCards || !responseCards"
            class="mx-auto bg-transparent font-semibold text-indigo-500 p-2 disabled:text-gray-900 hover:text-indigo-700 outline-none transition-all duration-300"
            @click="newGame()">
            <fa icon="plus" class="h-6 w-6" />
          </button>
        </h1>
      </div>

      <table v-if="games" class="min-w-max w-full table-auto border-2">
        <thead>
          <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th class="py-3 px-6 text-center w-1/12">#</th>
            <th class="py-3 px-6 text-left w-9/12">{{ $t('common.players') }}</th>
            <th class="py-3 px-6 text-center w-2/12">{{ $t('common.actions') }}</th>
          </tr>
        </thead>

        <tbody class="text-gray-600 text-sm font-light overflow-auto max-h-36">
          <tr v-for="(game, id, index) in games" :key="index" :class="{ 'bg-gray-50': index % 2 === 0, 'border-gray-200': index % 2 !== 0 }" class="border-b hover:bg-gray-100">
            <td v-if="displayRow(index)" class="py-3 px-6 text-center">
              <span class="badge mb-3 bg-gray-400 rounded-full px-2 py-1 text-center object-right-top text-white text-sm mr-1">{{ index + 1 }}</span>
            </td>
            <td v-if="displayRow(index)" class="py-3 px-6 text-left">
              <span v-for="(player, playerId, i) in game.players" :key="i">
                <span>{{ player.pseudo }}</span>
                <span v-if="Object.keys(game.players).length > i + 1" class="mr-1">,</span>
              </span>
            </td>
            <td v-if="displayRow(index)" class="py-3 px-6 flex item-center justify-center align-middle">
              <button
                :disabled="cantJoinGame(id)"
                class="bg-indigo-500 font-semibold text-white px-5 py-2 mr-2 rounded-full disabled:bg-gray-400 hover:bg-indigo-700 focus:outline-none shadow-lg hover:shadow-none transition-all duration-300"
                @click="joinGame(id)">
                {{ $t('games.join') }}
              </button>
              <div v-if="currentUser._id === id" class="w-4 transform hover:text-red-600 hover:scale-110 cursor-pointer" @click="deleteGame(id)">
                <fa icon="trash-alt" class="fa-lg h-9" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="games && total > perPage">
        <pagination :current="currentPage" :total="total" :perpage="perPage" :pagerange="pageRange" @change="currentPage = $event" />
      </div>
    </div>
  </div>
</template>
