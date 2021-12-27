export interface IState {
  firstLevelPage: string;
  secondLevelPage: string;
  thirdLevelPage: string;
  token: string;
}

const state: Function = () => ({
  firstLevelPage: undefined,
  secondLevelPage: undefined,
  thirdLevelPage: undefined,
});

export default state;
