import Http from './http';
import { AxiosResponse } from 'axios';
import { ICard, IQuestionCard, QuestionCardDTO } from '@/models/card';
import MongoService from './mongo-service';
import { FindResponseDTO } from '@/models/mongo-response';
import { FindRequestDTO, UpdateOneRequestDTO } from '@/models/mongo-request';

export default class QuestionCardService extends MongoService<QuestionCardDTO> {
  public constructor(http: Http) {
    super(http, 'question-cards');
  }

  public findAll(): Promise<AxiosResponse<FindResponseDTO<QuestionCardDTO>>> {
    const payload = new FindRequestDTO(this.configRequest);
    return this.find(payload);
  }

  public update(id: string, card: ICard & IQuestionCard): void {
    const payload = new UpdateOneRequestDTO(this.configRequest, { _id: { $oid: id } }, { $set: card });
    this.updateOne(payload);
  }
}
