import { IQuestionCard, IResponseCard } from '@/models/card';

export interface IState {
  questionCards: IQuestionCard[];
  responseCards: IResponseCard[];
}

const state: Function = () => ({
  questionCards: undefined,
  responseCards: undefined,
});

export default state;
