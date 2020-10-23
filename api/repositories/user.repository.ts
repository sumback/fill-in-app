import { Singleton } from 'typescript-ioc';
import { getMongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';

import { UserEntity } from '../entity/user.entity';

@Singleton
export class UserRepository {
  userRepository = getMongoRepository(UserEntity);

  public async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find({});
  }

  public async findById(id: string): Promise<UserEntity | undefined> {
    return await this.userRepository.findOne({ _id: new ObjectID(id) });
  }

  public async findByPseudo(pseudo: string): Promise<UserEntity | undefined> {
    return await this.userRepository.findOne({ pseudo });
  }

  public async create(entity: UserEntity): Promise<void> {
    await this.userRepository.insertOne(entity);
  }

  public async update(id: string, entity: UserEntity): Promise<void> {
    delete entity._id;
    await this.userRepository.findOneAndUpdate(
      { _id: new ObjectID(id) },
      { $set: entity }
    );
  }

  public async delete(id: string): Promise<void> {
    await this.userRepository.findOneAndDelete({ _id: new ObjectID(id) });
  }
}
