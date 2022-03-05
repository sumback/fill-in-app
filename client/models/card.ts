import { IMongoEntity } from './entity';
import { CardState } from './card-state';

export interface ICard {
  state?: CardState;
}

export interface IPlayCard extends IQuestionCard, IResponseCard, ICard {
  edit?: boolean;
}

export interface IQuestionCard {
  question?: string;
  nbResponse?: number;
}

export interface IResponseCard {
  response?: string;
}

export class QuestionCardDTO implements ICard, IQuestionCard, IMongoEntity {
  _id?: string;
  state?: CardState;
  question?: string;
  nbResponse?: number;

  constructor() {}
}

export class ResponseCardDTO implements ICard, IResponseCard, IMongoEntity {
  _id?: string;
  state?: CardState;
  response?: string;

  constructor() {}
}
