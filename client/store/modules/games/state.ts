import { FirebaseArray } from '@/models/entity';
import { IGame } from '@/models/games';

export interface IState {
  games: FirebaseArray<IGame>;
}

const state: Function = () => ({
  games: undefined,
});

export default state;
