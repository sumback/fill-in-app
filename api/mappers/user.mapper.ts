import * as bcrypt from 'bcrypt';

import { IUser, UserDto, UserEntity } from '../../models/user';

export class UserMapper {
  static async mapEntity(dto: UserDto): Promise<UserEntity> {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(dto.password, salt);
    return new UserEntity(dto.pseudo, passwordHash);
  }

  static mapDto(entity: UserEntity | null, id: string): UserDto | null {
    if (!entity) {
      return null;
    }
    const dto = new UserDto(entity.pseudo);
    dto.id = id;
    return dto;
  }

  static mapMultipleDto(entities: IUser[]): Array<UserDto> {
    const dtos = [];
    if (entities) {
      entities.forEach((entity) => {
        dtos.push(entity);
      });
    }
    return dtos;
  }

  static mapFirstDto(entities: IUser[]): UserDto | null {
    const resources = this.mapMultipleDto(entities);
    return resources.length > 0 ? resources[0] : null;
  }
}
