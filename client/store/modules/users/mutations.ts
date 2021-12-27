import { IState } from './state';
import { IUser } from '@/models/user';

const mutations: { [key: string]: Function } = {
  setCurrentUser(state: IState, currentUser: IUser) {
    state.currentUser = currentUser;
  },
};

export default mutations;
