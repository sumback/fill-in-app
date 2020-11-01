import * as jwt from 'jsonwebtoken';
import { Inject, Singleton } from 'typescript-ioc';

import { ObjectID } from 'typeorm';
import { UserDto } from '../../models/user';
import { UserRepository } from '../repositories/user.repository';

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface DataStoredInToken {
  userId: ObjectID;
}

@Singleton
export class AuthenticationService {
  @Inject
  private userRepository: UserRepository;

  public createToken(resource: UserDto): TokenData {
    const expiresIn = 60 * 60; // an hour
    const secret = process.env.JWT_SECRET;
    const dataStoredInToken: DataStoredInToken = {
      userId: resource._id
    };
    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, secret, { expiresIn })
    };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
  }
}
