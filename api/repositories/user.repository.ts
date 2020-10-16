import { Singleton } from 'typescript-ioc';

import mongoose from 'mongoose';
import { IUser, UserEntity, UserSchema } from '../../models/user';

@Singleton
export class UserRepository {
  UserModel = mongoose.model<IUser>('User', UserSchema);

  public async findAll(): Promise<IUser[]> {
    return await this.UserModel.find({});
  }

  public async findById(id: string): Promise<IUser> {
    return await this.UserModel.findById(id);
  }

  public async findByPseudo(pseudo: string): Promise<IUser[]> {
    return await this.UserModel.find({ pseudo });
  }

  public async create(entity: UserEntity): Promise<IUser> {
    const model = new this.UserModel(entity);
    await model.save();
    return model;
  }

  public async update(id: string, entity: UserEntity): Promise<void> {
    const model = await this.UserModel.findByIdAndUpdate(id, entity);
    await model.save();
  }

  public async delete(id: string): Promise<void> {
    await this.UserModel.findByIdAndRemove(id);
  }
}
