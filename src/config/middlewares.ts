import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import passport from 'passport';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

export class Middlewares {
    router = express.Router();

    constructor () {
        dotenv.config({path: path.resolve(__dirname, '../../env/.env')});
    }

    initialize() {
        this.router.use(morgan("dev"));
        this.router.use(cors());
        this.router.use(passport.initialize());
        this.router.use(bodyParser.json());
        this.router.use(bodyParser.urlencoded({ extended: false }));

        return this.router;
    }
}
