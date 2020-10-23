import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';
import { IUser } from '../../models/user';

@Entity('users')
export class UserEntity implements IUser {
  @ObjectIdColumn()
  _id?: ObjectID;

  @Column({
    length: 100
  })
  pseudo: string;

  @Column()
  passwordHash: string;

  constructor(id: ObjectID | undefined, pseudo: string, passwordHash: string) {
    this._id = id;
    this.pseudo = pseudo;
    this.passwordHash = passwordHash;
  }
}
