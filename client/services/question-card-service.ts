import Http from './http';
import { AxiosResponse } from 'axios';
import { QuestionCardDTO } from '@/models/card';
import MongoService from './mongo-service';
import { FindResponseDTO } from '@/models/mongo-response';
import { FindRequestDTO } from '@/models/mongo-request';

export default class QuestionCardService extends MongoService<QuestionCardDTO> {
  public constructor(http: Http) {
    super(http, 'question-cards');
  }

  public findAll(): Promise<AxiosResponse<FindResponseDTO<QuestionCardDTO>>> {
    const payload = new FindRequestDTO(this.configRequest);
    return this.find(payload);
  }
}
