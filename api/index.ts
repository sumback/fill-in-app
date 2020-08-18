import bodyParser from 'body-parser';
import express from 'express';
import swaggerUI from 'swagger-ui-express';

import { RegisterRoutes } from './config/routes';

class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
        this.swagger();
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    private routes(): void {
        // @ts-ignore
        RegisterRoutes(this.app);
    }

    private swagger(): void {
        if (process.env.NODE_ENV !== 'production') {
            const swaggerDoc =  require('./config/swagger.json');
            this.app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerDoc));
        }
    }
}

export default new App().app;