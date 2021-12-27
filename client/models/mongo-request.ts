//https://docs.atlas.mongodb.com/api/data-api-resources/
export class ConfigRequestDTO {
  dataSource: string;
  database: string;
  collection: string;

  constructor(dataSource: string, database: string, collection: string) {
    this.dataSource = dataSource;
    this.database = database;
    this.collection = collection;
  }
}

export class FindOneRequestDTO extends ConfigRequestDTO {
  filter?: object;
  projection?: object;

  constructor(config: ConfigRequestDTO) {
    super(config.dataSource, config.database, config.collection);
  }
}

export class FindRequestDTO extends ConfigRequestDTO {
  filter?: object;
  projection?: object;
  sort?: object;
  limit?: number;
  skip?: number;

  constructor(config: ConfigRequestDTO) {
    super(config.dataSource, config.database, config.collection);
  }
}

export class InsertOneRequestDTO extends ConfigRequestDTO {
  document: object;

  constructor(config: ConfigRequestDTO, document: object) {
    super(config.dataSource, config.database, config.collection);
    this.document = document;
  }
}

export class InsertManyRequestDTO extends ConfigRequestDTO {
  documents: object[];

  constructor(config: ConfigRequestDTO, documents: object[]) {
    super(config.dataSource, config.database, config.collection);
    this.documents = documents;
  }
}

export class UpdateOneRequestDTO extends ConfigRequestDTO {
  filter: object;
  update: object;
  upsert?: boolean;

  constructor(config: ConfigRequestDTO, filter: object, update: object) {
    super(config.dataSource, config.database, config.collection);
    this.filter = filter;
    this.update = update;
  }
}

export class UpdateManyRequestDTO extends ConfigRequestDTO {
  filter: object;
  update: object;
  upsert?: boolean;

  constructor(config: ConfigRequestDTO, filter: object, update: object) {
    super(config.dataSource, config.database, config.collection);
    this.filter = filter;
    this.update = update;
  }
}

export class ReplaceOneRequestDTO extends ConfigRequestDTO {
  filter: object;
  replacement: object;
  upsert?: boolean;

  constructor(config: ConfigRequestDTO, filter: object, replacement: object) {
    super(config.dataSource, config.database, config.collection);
    this.filter = filter;
    this.replacement = replacement;
  }
}

export class DeleteOneRequestDTO extends ConfigRequestDTO {
  filter: object;

  constructor(config: ConfigRequestDTO, filter: object) {
    super(config.dataSource, config.database, config.collection);
    this.filter = filter;
  }
}

export class DeleteManyRequestDTO extends ConfigRequestDTO {
  filter: object;

  constructor(config: ConfigRequestDTO, filter: object) {
    super(config.dataSource, config.database, config.collection);
    this.filter = filter;
  }
}

export class AggregateRequestDTO extends ConfigRequestDTO {
  pipeline: object[];

  constructor(config: ConfigRequestDTO, pipeline: object[]) {
    super(config.dataSource, config.database, config.collection);
    this.pipeline = pipeline;
  }
}
