import Cookies from 'js-cookie';

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
  token: Cookies.get('Authorization') || undefined,
});

export default state;
