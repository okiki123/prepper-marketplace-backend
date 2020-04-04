import express, {Application} from 'express';
import {Middlewares} from './config/middlewares';
import {Db} from './config/db';
import {PassportAuthenticate as Authenticator} from "./config/passport";
import api from './routes/index';
import {ErrorsController} from "./controllers/errors.controller";

export class App {
    app: Application;
    port;

    constructor() {
        this.app = express();
        this.setConfigs();
    }

    private setConfigs() {
        const middleWare = new Middlewares();
        const db = new Db();
        const authenticator = new Authenticator();
        this.app.use(middleWare.initialize());
        db.connect();
        authenticator.run();
        this.app.use(api);
        this.app.use(ErrorsController.undefinedRoute);
        this.app.use(ErrorsController.errorHandler);
    }

    run() {
        this.port = process.env.PORT;
        this.app.listen(this.port, () => {
            console.log(`Node Server listening on Port ${this.port}`);
        });
    }
}



