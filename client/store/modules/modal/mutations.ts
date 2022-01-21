import { IState } from './state';

const mutations: { [key: string]: Function } = {
  setOpen(state: IState, open: boolean) {
    state.open = open;
  },
  setClosable(state: IState, closable: boolean) {
    state.closable = closable;
  },
  setTitle(state: IState, title: string) {
    state.title = title;
  },
  setContent(state: IState, content: any) {
    state.content = content;
  },
};

export default mutations;
