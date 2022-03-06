import Http from './http';
import { AxiosResponse } from 'axios';
import { ICard, IQuestionCard, IResponseCard, ResponseCardDTO } from '@/models/card';
import MongoService from './mongo-service';
import { FindResponseDTO } from '@/models/mongo-response';
import { FindRequestDTO, UpdateOneRequestDTO } from '@/models/mongo-request';

export default class ResponseCardService extends MongoService<ResponseCardDTO> {
  public constructor(http: Http) {
    super(http, 'response-cards');
  }

  public findAll(): Promise<AxiosResponse<FindResponseDTO<ResponseCardDTO>>> {
    const payload = new FindRequestDTO(this.configRequest);
    payload.limit = 50000;
    return this.find(payload);
  }

  public update(id: string, card: ICard & IResponseCard): void {
    const payload = new UpdateOneRequestDTO(this.configRequest, { _id: { $oid: id } }, { $set: card });
    this.updateOne(payload);
  }
}
