import { IMongoEntity } from './mongo-entity';

export interface IUser {
  pseudo: string;
}

export interface INewUser {
  pseudo: string;
  password?: string;
}

export interface IUpdateUser {
  pseudo: string;
  password?: string;
  oldPassword?: string;
}

export class UserDTO implements IUser, INewUser, IUpdateUser, IMongoEntity {
  _id?: string;
  pseudo: string;
  password?: string;
  oldPassword?: string;

  constructor(pseudo: string) {
    this.pseudo = pseudo;
  }
}
