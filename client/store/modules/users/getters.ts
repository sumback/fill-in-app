import { IState } from './state';

const getters: { [key: string]: Function } = {
  getCurrentUser(state: IState) {
    return state.currentUser;
  },
};

export default getters;
