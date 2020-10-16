import bodyParser from 'body-parser';
import express, { NextFunction } from 'express';
import mongoose from 'mongoose';
import swaggerUI from 'swagger-ui-express';

import { BadRequest, Conflict, NotFound } from '../models/http-errors';
import { RegisterRoutes } from './config/routes';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: './api/config/.env' });

class App {
  public app: express.Application;

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

  private mongodb() {
    mongoose.set('debug', Boolean(process.env.MONGODB_DEBUG));
    console.log(process.env.MONGODB_URI);
    mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useFindAndModify: false
    });
    mongoose.connection.once('open', () => {
      console.info('Connected to Mongo via Mongoose');
    });
    mongoose.connection.on('error', (err) => {
      console.error('Unable to connect to Mongo via Mongoose', err);
    });
  }

  private errorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    console.error(err);
    switch (err.constructor) {
      case BadRequest:
        return res.status(400).json({ message: 'Bad Request' });
      case NotFound:
        return res.status(404).json({ message: 'Not Found' });
      case Conflict:
        return res.status(409).json({ message: 'Conflict' });
      default:
        return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

export default new App().app;
