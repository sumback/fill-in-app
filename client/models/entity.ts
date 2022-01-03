export interface IMongoEntity {
  _id?: string;
}

export interface FirebaseArray<T> {
  [key: string]: T;
}
