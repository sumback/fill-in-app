//https://docs.atlas.mongodb.com/api/data-api-resources/
import { AxiosResponse } from 'axios';
import Http from './http';
import {
  ConfigRequestDTO,
  FindOneRequestDTO,
  FindRequestDTO,
  InsertOneRequestDTO,
  InsertManyRequestDTO,
  UpdateOneRequestDTO,
  UpdateManyRequestDTO,
  ReplaceOneRequestDTO,
  DeleteOneRequestDTO,
  DeleteManyRequestDTO,
  AggregateRequestDTO,
} from '@/models/mongo-request';
import {
  FindOneResponseDTO,
  FindResponseDTO,
  InsertOneResponseDTO,
  InsertManyResponseDTO,
  UpdateOneResponseDTO,
  UpdateManyResponseDTO,
  ReplaceOneResponseDTO,
  DeleteOneResponseDTO,
  DeleteManyResponseDTO,
  AggregateResponseDTO,
} from '@/models/mongo-response';

export default abstract class MongoService<T> {
  protected http: Http;
  protected configRequest: ConfigRequestDTO;

  protected constructor(http: Http, collection: string) {
    this.http = http;
    this.configRequest = new ConfigRequestDTO(
      String(import.meta.env.VITE_API_MONGO_DATA_SOURCE),
      String(import.meta.env.VITE_API_MONGO_DATABASE),
      collection,
    );
  }

  protected findOne(payload: FindOneRequestDTO): Promise<AxiosResponse<FindOneResponseDTO<T>>> {
    return this.http.post('/mongo/findOne', payload);
  }

  protected find(payload: FindRequestDTO): Promise<AxiosResponse<FindResponseDTO<T>>> {
    return this.http.post('/mongo/find', payload);
  }

  protected insertOne(payload: InsertOneRequestDTO): Promise<AxiosResponse<InsertOneResponseDTO>> {
    return this.http.post('/mongo/insertOne', payload);
  }

  protected insertMany(payload: InsertManyRequestDTO): Promise<AxiosResponse<InsertManyResponseDTO>> {
    return this.http.post('/mongo/insertMany', payload);
  }

  protected updateOne(payload: UpdateOneRequestDTO): Promise<AxiosResponse<UpdateOneResponseDTO>> {
    return this.http.post('/mongo/updateOne', payload);
  }

  protected updateMany(payload: UpdateManyRequestDTO): Promise<AxiosResponse<UpdateManyResponseDTO>> {
    return this.http.post('/mongo/updateMany', payload);
  }

  protected replaceOne(payload: ReplaceOneRequestDTO): Promise<AxiosResponse<ReplaceOneResponseDTO>> {
    return this.http.post('/mongo/replaceOne', payload);
  }

  protected deleteOne(payload: DeleteOneRequestDTO): Promise<AxiosResponse<DeleteOneResponseDTO>> {
    return this.http.post('/mongo/deleteOne', payload);
  }

  protected deleteMany(payload: DeleteManyRequestDTO): Promise<AxiosResponse<DeleteManyResponseDTO>> {
    return this.http.post('/mongo/deleteMany', payload);
  }

  protected aggregate(payload: AggregateRequestDTO): Promise<AxiosResponse<AggregateResponseDTO<T>>> {
    return this.http.post('/mongo/aggregate', payload);
  }
}
