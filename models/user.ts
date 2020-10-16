import { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  pseudo: string;
  passwordHash: string;
}

export class UserEntity {
  pseudo: string;
  passwordHash: string;

  constructor(pseudo: string, passwordHash: string) {
    this.pseudo = pseudo;
    this.passwordHash = passwordHash;
  }
}

export class UserDto {
  /*
   * The user's UID
   */
  id?: string;
  pseudo: string;
  password?: string;
  oldPassword?: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(pseudo: string, args?: any) {
    this.pseudo = pseudo;
    if (args) {
      this.password = args.password;
      this.oldPassword = args.oldPassword;
    }
  }
}

export const UserSchema: Schema = new Schema({
  pseudo: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true }
});
