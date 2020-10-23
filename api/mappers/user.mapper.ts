import * as bcrypt from 'bcrypt';

import { UserEntity } from '../entity/user.entity';
import { UserDto } from '../../models/user';

export class UserMapper {
  static async mapEntity(dto: UserDto): Promise<UserEntity> {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(dto.password, salt);
    return new UserEntity(dto._id, dto.pseudo, passwordHash);
  }

  static mapDto(entity: UserEntity): UserDto {
    return new UserDto(entity._id, entity.pseudo);
  }

  static mapMultipleDto(entities: UserEntity[]): Array<UserDto> {
    const dtos: Array<UserDto> = [];
    if (entities) {
      entities.forEach((entity: UserEntity) => dtos.push(this.mapDto(entity)));
    }
    return dtos;
  }
}
