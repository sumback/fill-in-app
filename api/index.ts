import bodyParser from 'body-parser';
import express, { NextFunction } from 'express';
import { createConnection, Connection } from 'typeorm';
import 'reflect-metadata';
import swaggerUI from 'swagger-ui-express';

import {
  BadRequest,
  Conflict,
  NotFound,
  Unauthorized
} from '../models/http-errors';
import { RegisterRoutes } from './config/routes';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: './api/config/.env' });

class App {
  public app: express.Application;
  public connection: Connection | undefined;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
    this.swagger();
    this.mongodb();
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  private routes(): void {
    RegisterRoutes(this.app);
    this.app.use(this.errorHandler);
  }

  private swagger(): void {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const swaggerDoc = require('./config/swagger.json');
      this.app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerDoc));
    }
  }

  private async mongodb(): Promise<void> {
    this.connection = await createConnection({
      // eslint-disable-next-line no-path-concat
      entities: ['./**/*.entity.ts'],
      logging: true,
      synchronize: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      type: 'mongodb',
      url: process.env.MONGODB_URI
    });
  }

  private errorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    switch (err.constructor) {
      case BadRequest:
        return res.status(400).json({ message: 'Bad Request' });
      case Unauthorized:
        return res.status(401).json({ message: 'Unauthorized' });
      case NotFound:
        return res.status(404).json({ message: 'Not Found' });
      case Conflict:
        return res.status(409).json({ message: 'Conflict' });
      default:
        if (process.env.NODE_ENV !== 'production') {
          console.error(err);
        }
        return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

export default new App().app;
