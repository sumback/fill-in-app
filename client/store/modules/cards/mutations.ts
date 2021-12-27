import { IState } from './state';
import { IQuestionCard, IResponseCard } from '@/models/card';

const mutations: { [key: string]: Function } = {
  setQuestionCards(state: IState, questionCards: IQuestionCard[]) {
    state.questionCards = questionCards;
  },
  setResponseCards(state: IState, responseCards: IResponseCard[]) {
    state.responseCards = responseCards;
  },
};

export default mutations;
