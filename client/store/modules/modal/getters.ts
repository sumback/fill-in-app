import { IState } from './state';

const getters: { [key: string]: Function } = {
  isOpen(state: IState) {
    return state.open;
  },
  isClosable(state: IState) {
    return state.closable;
  },
  getTitle(state: IState) {
    return state.title;
  },
  getContent(state: IState) {
    return state.content;
  },
};

export default getters;
