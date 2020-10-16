import { Inject, Singleton } from 'typescript-ioc';
import * as bcrypt from 'bcrypt';

import { UserMapper } from '../mappers/user.mapper';
import { UserRepository } from '../repositories/user.repository';
import { UserDto, UserEntity } from '../../models/user';

@Singleton
export class UserService {
  @Inject
  private userRepository: UserRepository;

  public async findAll(): Promise<Array<UserDto>> {
    const entities = await this.userRepository.findAll();
    return UserMapper.mapMultipleDto(entities);
  }

  public async findById(id: string): Promise<UserDto | null> {
    const entity = await this.userRepository.findById(id);
    return UserMapper.mapDto(entity, entity.id);
  }

  public async findByPseudo(pseudo: string): Promise<UserDto | null> {
    const entities = await this.userRepository.findByPseudo(pseudo);
    return UserMapper.mapFirstDto(entities);
  }

  public async create(resource: UserDto): Promise<UserEntity> {
    const entity: UserEntity = await UserMapper.mapEntity(resource);
    return this.userRepository.create(entity);
  }

  public async update(id: string, resource: UserDto): Promise<void> {
    const entity: UserEntity = await UserMapper.mapEntity(resource);
    return this.userRepository.update(id, entity);
  }

  public delete(id: string): Promise<void> {
    return this.userRepository.delete(id);
  }

  public async checkPassword(
    pseudo: string,
    password: string
  ): Promise<boolean> {
    const entity = await this.userRepository.findByPseudo(pseudo);
    return await bcrypt.compare(password, entity[0].passwordHash);
  }
}
