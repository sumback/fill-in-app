import { IState } from './state';

const getters: { [key: string]: Function } = {
  getFirstLevelPage(state: IState) {
    return state.firstLevelPage;
  },
  getSecondLevelPage(state: IState) {
    return state.secondLevelPage;
  },
  getThirdLevelPage(state: IState) {
    return state.thirdLevelPage;
  },
};

export default getters;
