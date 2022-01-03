import { IMongoEntity } from './entity';

export interface IUser {
  pseudo?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
}

export interface IUpdateUser {
  pseudo?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  oldPassword?: string;
}

export class UserDTO implements IUser, IUpdateUser, IMongoEntity {
  _id?: string;
  pseudo?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  oldPassword?: string;

  constructor() {}
}
