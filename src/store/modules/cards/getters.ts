import { IState } from './state';

const getters: { [key: string]: Function } = {
  getQuestionCards(state: IState) {
    return state.questionCards;
  },
  getResponseCards(state: IState) {
    return state.responseCards;
  },
};

export default getters;
