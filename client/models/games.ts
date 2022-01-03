import { FirebaseArray, IMongoEntity } from './entity';
import { IQuestionCard, IResponseCard, QuestionCardDTO, ResponseCardDTO } from '@/models/card';
import { IUser, UserDTO } from '@/models/user';
import { PlayerState } from '@/models/player-state';
import { GameState } from '@/models/game-state';

export interface IGamePlayer extends IUser {
  state: PlayerState;
  point: number;
}

export interface IGameQuestionCard extends IQuestionCard {
  discard: boolean;
}

export interface IGameResponseCard extends IResponseCard {
  player?: string;
}

export interface IGameProposal {
  question: string;
  responses: string[];
}

export interface IGame {
  state: GameState;
  players: FirebaseArray<IGamePlayer>;
  questionCards: FirebaseArray<IGameQuestionCard>;
  responseCards: FirebaseArray<IGameResponseCard>;
  proposals: FirebaseArray<IGameProposal>;
}

export class GameDTO implements IGame {
  state: GameState;
  players: FirebaseArray<IGamePlayer>;
  questionCards: FirebaseArray<IGameQuestionCard>;
  responseCards: FirebaseArray<IGameResponseCard>;
  proposals: FirebaseArray<IGameProposal>;

  constructor(host: UserDTO, questionCards: QuestionCardDTO[], responseCards: ResponseCardDTO[]) {
    this.state = GameState.WAITIN;
    this.players = convert([Object.assign({}, { ...host, state: PlayerState.BOSS, point: 0 })]);
    this.questionCards = convert(questionCards.map((obj) => ({ ...obj, discard: false })));
    this.responseCards = convert(responseCards);
    this.proposals = {
      ['default']: { question: Object.keys(getRandomQuestionCard(this.questionCards))[0], responses: [] },
    };
  }
}

export function convert(arr: Array<IMongoEntity>): FirebaseArray<any> {
  return Object.assign(
    {},
    ...arr.map((entity) => {
      const id = String(entity._id);
      delete entity._id;
      return { [id]: entity };
    }),
  );
}

export function getRandomQuestionCard(cards: FirebaseArray<IGameQuestionCard>): FirebaseArray<IGameQuestionCard> {
  const randomIndex = Math.floor(Math.random() * Object.keys(cards).length);
  const key = Object.keys(cards)[randomIndex];
  const value = cards[key];
  return { [key]: value };
}

export function getRandomResponseCard(cards: FirebaseArray<IGameResponseCard>): FirebaseArray<IGameResponseCard> {
  const randomIndex = Math.floor(Math.random() * Object.keys(cards).length);
  const key = Object.keys(cards)[randomIndex];
  const value = cards[key];
  return { [key]: value };
}
