import { IUser } from '../../../models/user';

export interface IState {
  currentUser: IUser;
  userList: IUser[];
}

const state: Function = () => ({
  currentUser: undefined,
  userList: undefined,
});

export default state;
