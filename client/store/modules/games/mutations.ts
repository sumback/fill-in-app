import { IState } from './state';
import { FirebaseArray } from '@/models/entity';
import { IGame } from '@/models/games';

const mutations: { [key: string]: Function } = {
  setGames(state: IState, games: FirebaseArray<IGame>) {
    state.games = games;
  },
};

export default mutations;
