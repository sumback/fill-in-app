import { getMongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';
import { MongoRepository } from 'typeorm/repository/MongoRepository';
import { EntityTarget } from 'typeorm/common/EntityTarget';

export interface IWrite<T> {
  create(entity: T): Promise<void>;
  update(id: string, item: T): Promise<void>;
  delete(id: string): Promise<void>;
}

export interface IRead<T> {
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T>;
}

export abstract class DefaultRepository<T> implements IWrite<T>, IRead<T> {
  protected repository: MongoRepository<T>;

  constructor(entityClass: EntityTarget<T>) {
    this.repository = getMongoRepository(entityClass);
  }

  public async findAll(): Promise<T[]> {
    return await this.repository.find({});
  }

  public async findById(id: string): Promise<T> {
    return await this.repository.findOne({ _id: new ObjectID(id) });
  }

  public async create(entity: T): Promise<void> {
    await this.repository.insertOne(entity);
  }

  public async update(id: string, entity: T): Promise<void> {
    delete entity._id;
    await this.repository.findOneAndUpdate(
      { _id: new ObjectID(id) },
      { $set: entity }
    );
  }

  public async delete(id: string): Promise<void> {
    await this.repository.findOneAndDelete({ _id: new ObjectID(id) });
  }
}
