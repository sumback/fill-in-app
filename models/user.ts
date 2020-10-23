import { ObjectID } from 'typeorm';

export interface IUser {
  _id?: ObjectID;
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

export class UserDto implements IUser, INewUser, IUpdateUser {
  _id?: ObjectID;
  pseudo: string;
  password?: string;
  oldPassword?: string;

  constructor(id: ObjectID | undefined, pseudo: string) {
    this._id = id;
    this.pseudo = pseudo;
  }
}
