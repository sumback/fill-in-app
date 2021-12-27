import { IState } from './state';

const mutations: { [key: string]: Function } = {
  setFirstLevelPage(state: IState, firstLevelPage: string) {
    state.firstLevelPage = firstLevelPage;
  },
  setSecondLevelPage(state: IState, secondLevelPage: string) {
    state.secondLevelPage = secondLevelPage;
  },
  setThirdLevelPage(state: IState, thirdLevelPage: string) {
    state.thirdLevelPage = thirdLevelPage;
  },
};

export default mutations;
