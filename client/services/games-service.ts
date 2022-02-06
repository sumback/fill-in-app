import Firebase from './firebase';
import { DatabaseReference, DataSnapshot } from '@firebase/database';
import { child, get, onValue, ref, set, push, update } from 'firebase/database';
import store from '@/store';
import {
  GameDTO,
  getRandomQuestionCard,
  getRandomResponseCard,
  IGame,
  IGameOldProposal,
  IGamePlayer,
  IGameProposal,
  IGameQuestionCard,
  IGameResponseCard,
} from '@/models/games';
import { GameState } from '@/models/game-state';
import { UserDTO } from '@/models/user';
import { QuestionCardDTO, ResponseCardDTO } from '@/models/card';
import { FirebaseArray } from '@/models/entity';
import { PlayerState } from '@/models/player-state';

export default class GamesService {
  private firebase: Firebase;
  readonly gamesRef: DatabaseReference;
  readonly HANDS_LENGTH: number = 12;

  constructor(firebase: Firebase) {
    this.firebase = firebase;
    this.gamesRef = ref(this.firebase.database, 'games');

    onValue(this.gamesRef, (snapshot) => {
      store.dispatch('setGames', snapshot.val());
    });
  }

  public addGame(host: UserDTO, questionCards: QuestionCardDTO[], responseCards: ResponseCardDTO[]): Promise<void> {
    const game = new GameDTO(host, questionCards, responseCards);
    return set(ref(this.firebase.database, 'games/' + host._id), game);
  }

  public addPlayer(id: string, user: UserDTO): Promise<void> {
    return set(ref(this.firebase.database, 'games/' + id + '/players/' + user._id), {
      pseudo: user.pseudo,
      state: PlayerState.CHOOSING,
      point: 0,
    });
  }

  public addProposal(gameId: string, proposalId: string, proposal: IGameProposal): Promise<void> {
    return set(ref(this.firebase.database, 'games/' + gameId + '/proposals/' + proposalId), proposal);
  }

  public addLastProposalSelected(gameId: string, proposal: IGameOldProposal): void {
    push(ref(this.firebase.database, 'games/' + gameId + '/lastProposalSelected'), proposal);
  }

  /**
   * @deprecated L'utilisation inutile de find() peut augmenter l' utilisation de la bande passante
   * et entraîner une perte de performance, qui peut être évité en utilisant un écouteur en temps réel
   */
  public find(): Promise<DataSnapshot> {
    return get(child(ref(this.firebase.database), 'games'));
  }

  public deleteOne(id: string): Promise<void> {
    return set(ref(this.firebase.database, 'games/' + id), null);
  }

  public updateState(id: string, state: GameState) {
    const updates: { [key: string]: any } = {};
    updates['games/' + id + '/state'] = state;
    update(ref(this.firebase.database), updates);
  }

  updatePlayers(id: string, players: FirebaseArray<IGamePlayer>) {
    const updates: { [key: string]: any } = {};
    for (const [key, value] of Object.entries(players)) {
      updates['games/' + id + '/players/' + key] = value;
    }
    update(ref(this.firebase.database), updates);
  }

  public updateResponseCards(id: string, responseCards: FirebaseArray<IGameResponseCard>) {
    const updates: { [key: string]: any } = {};
    for (const [key, value] of Object.entries(responseCards)) {
      updates['games/' + id + '/responseCards/' + key] = value;
    }
    update(ref(this.firebase.database), updates);
  }

  public updateQuestionCards(id: string, questionCards: FirebaseArray<IGameQuestionCard>) {
    const updates: { [key: string]: any } = {};
    for (const [key, value] of Object.entries(questionCards)) {
      updates['games/' + id + '/questionCards/' + key] = value;
    }
    update(ref(this.firebase.database), updates);
  }

  public drawResponseCards(game: IGame): FirebaseArray<IGameResponseCard> {
    let array: FirebaseArray<IGameResponseCard> = {};
    Object.keys(game.players).forEach((id: string) => {
      const start = Object.values(game.responseCards).filter((card) => card.player === id).length;
      for (let i = start; i < this.HANDS_LENGTH; i++) {
        const cards = Object.fromEntries(Object.entries(game.responseCards).filter(([key, value]) => !value.player));
        const card = getRandomResponseCard(cards);
        card[Object.keys(card)[0]].player = id;
        array = { ...array, ...card };
      }
    });
    return array;
  }

  public drawQuestionCard(game: IGame): FirebaseArray<IGameQuestionCard> {
    const questionCards = Object.fromEntries(
      Object.entries(game.questionCards).filter(([key, value]) => !value.discard),
    );
    return getRandomQuestionCard(questionCards);
  }

  public resetProposals(id: string): Promise<void> {
    return set(ref(this.firebase.database, 'games/' + id + '/proposals'), null);
  }

  public discardProposalQuestionCard(game: IGame): FirebaseArray<IGameQuestionCard> {
    const card: FirebaseArray<IGameQuestionCard> = {};
    if (game.proposals && game.proposals['default']) {
      const id = game.proposals['default'].question;
      card[id] = game.questionCards[id];
      card[id].discard = true;
    }
    return card;
  }

  public discardProposalResponseCards(game: IGame): FirebaseArray<IGameResponseCard> {
    let array: FirebaseArray<IGameResponseCard> = {};
    Object.entries(game.proposals)
      .filter(([key, value]) => key != 'default')
      .map(([key, value]) => value.responses)
      .reduce((pre, cur) => pre.concat(cur))
      .forEach((id: string) => {
        const card = { [id]: game.responseCards[id] };
        card[id].player = 'discard';
        array = { ...array, ...card };
      });
    return array;
  }
}
