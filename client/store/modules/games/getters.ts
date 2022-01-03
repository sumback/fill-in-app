import { IState } from './state';

const getters: { [key: string]: Function } = {
  getGames(state: IState) {
    return state.games;
  },
};

export default getters;
