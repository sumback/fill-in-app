import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import { getMongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';

import { Unauthorized } from '../../models/http-errors';
import { UserEntity } from '../entity/user.entity';
import { DataStoredInToken } from '../services/authentication.service';

export async function expressAuthentication(
  request: express.Request,
  securityName: string,
  scopes?: string[]
): Promise<any> {
  if (securityName === 'jwt') {
    const token =
      request.cookies?.Authorization || request.headers?.authorization;
    if (token) {
      const secret = process.env.JWT_SECRET;
      let verificationResponse;
      try {
        verificationResponse = jwt.verify(token, secret) as DataStoredInToken;
        console.log('verificationResponse', verificationResponse);
      } catch (error) {
        throw new Unauthorized();
      }
      const user = await getMongoRepository(UserEntity).findOne({
        _id: new ObjectID(verificationResponse.userId)
      });
      console.log('user', user);
      if (!user) {
        throw new Unauthorized();
      }
      return Promise.resolve();
    } else {
      throw new Unauthorized();
    }
  }
}
