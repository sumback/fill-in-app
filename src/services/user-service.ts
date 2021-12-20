import Http from './http';
import { AxiosResponse } from 'axios';
import { UserDTO } from '../models/user';
import MongoService from './mongo-service';
import { FindResponseDTO } from '../models/mongo-response';
import { FindRequestDTO } from '../models/mongo-request';

export default class UserService extends MongoService<UserDTO> {
  public constructor(http: Http) {
    super(http, 'users');
  }

  public findAll(): Promise<AxiosResponse<FindResponseDTO<UserDTO>>> {
    return this.find(new FindRequestDTO(this.configRequest));
  }
}
