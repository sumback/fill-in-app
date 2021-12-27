import Http from './http';
import { AxiosResponse } from 'axios';
import { IUser, UserDTO } from '@/models/user';
import MongoService from './mongo-service';
import { FindOneResponseDTO, FindResponseDTO, InsertOneResponseDTO } from '@/models/mongo-response';
import { FindOneRequestDTO, FindRequestDTO, InsertOneRequestDTO } from '@/models/mongo-request';

export default class UserService extends MongoService<UserDTO> {
  public constructor(http: Http) {
    super(http, 'users');
  }

  public findOneById(id: string): Promise<AxiosResponse<FindOneResponseDTO<UserDTO>>> {
    const payload = new FindOneRequestDTO(this.configRequest);
    payload.filter = { _id: { $oid: id } };
    payload.projection = { password: 0 };
    return this.findOne(payload);
  }

  public findOneByPseudo(pseudo: string, projection?: object): Promise<AxiosResponse<FindOneResponseDTO<UserDTO>>> {
    const payload = new FindOneRequestDTO(this.configRequest);
    payload.filter = { pseudo: pseudo };
    payload.projection = projection;
    return this.findOne(payload);
  }

  public create(newUser: IUser): Promise<AxiosResponse<InsertOneResponseDTO>> {
    return this.insertOne(new InsertOneRequestDTO(this.configRequest, newUser));
  }

  public findAll(): Promise<AxiosResponse<FindResponseDTO<UserDTO>>> {
    const payload = new FindRequestDTO(this.configRequest);
    payload.projection = { password: 0 };
    return this.find(payload);
  }
}
