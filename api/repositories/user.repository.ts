import { Singleton } from 'typescript-ioc';

import { UserEntity } from '../entity/user.entity';
import { DefaultRepository } from './default.repository';

@Singleton
export class UserRepository extends DefaultRepository<UserEntity> {
  constructor() {
    super(UserEntity);
  }

  public async findByPseudo(pseudo: string): Promise<UserEntity | undefined> {
    return await this.repository.findOne({ pseudo });
  }
}
