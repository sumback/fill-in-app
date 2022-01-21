export interface IState {
  open: boolean;
  closable: boolean;
  title: string;
  content: any;
}

const state: Function = () => ({
  open: false,
  closable: false,
  title: undefined,
  content: undefined,
});

export default state;
