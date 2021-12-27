import Http from './http';
import { AxiosResponse } from 'axios';
import { ResponseCardDTO } from '@/models/card';
import MongoService from './mongo-service';
import { FindResponseDTO } from '@/models/mongo-response';
import { FindRequestDTO } from '@/models/mongo-request';

export default class ResponseCardService extends MongoService<ResponseCardDTO> {
  public constructor(http: Http) {
    super(http, 'response-cards');
  }

  public findAll(): Promise<AxiosResponse<FindResponseDTO<ResponseCardDTO>>> {
    const payload = new FindRequestDTO(this.configRequest);
    return this.find(payload);
  }
}
