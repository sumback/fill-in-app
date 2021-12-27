//https://docs.atlas.mongodb.com/api/data-api-resources/
export class FindOneResponseDTO<T> {
  document: T | null;

  constructor(document: T | null) {
    this.document = document;
  }
}

export class FindResponseDTO<T> {
  documents: T[] | null;

  constructor(documents: T[] | null) {
    this.documents = documents;
  }
}

export class InsertOneResponseDTO {
  insertedId: string;

  constructor(insertedId: string) {
    this.insertedId = insertedId;
  }
}

export class InsertManyResponseDTO {
  insertedIds: string[];

  constructor(insertedIds: string[]) {
    this.insertedIds = insertedIds;
  }
}

export class UpdateOneResponseDTO {
  matchedCount: number;
  modifiedCount: number;
  upsertedId?: string;

  constructor(matchedCount: number, modifiedCount: number) {
    this.matchedCount = matchedCount;
    this.modifiedCount = modifiedCount;
  }
}

export class UpdateManyResponseDTO {
  matchedCount: number;
  modifiedCount: number;
  upsertedId?: string;

  constructor(matchedCount: number, modifiedCount: number) {
    this.matchedCount = matchedCount;
    this.modifiedCount = modifiedCount;
  }
}

export class ReplaceOneResponseDTO {
  matchedCount: number;
  modifiedCount: number;
  upsertedId?: string;

  constructor(matchedCount: number, modifiedCount: number) {
    this.matchedCount = matchedCount;
    this.modifiedCount = modifiedCount;
  }
}

export class DeleteOneResponseDTO {
  deletedCount: number;

  constructor(deletedCount: number) {
    this.deletedCount = deletedCount;
  }
}

export class DeleteManyResponseDTO {
  deletedCount: number;

  constructor(deletedCount: number) {
    this.deletedCount = deletedCount;
  }
}

export class AggregateResponseDTO<T> {
  documents: T[] | null;

  constructor(documents: T[] | null) {
    this.documents = documents;
  }
}
