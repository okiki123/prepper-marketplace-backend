import {Request, Response, NextFunction} from "express";
import jwt from 'jsonwebtoken';
import {UserModel} from "../models/user.model";
import {HttpError} from "../exceptions/http.error";
import {STATUS} from "../constants/status-code";
import {ERROR_MESSAGES} from "../constants/error-message";
import {ERROR_NAMES} from "../constants/error-names";
import {ERROR_CODES} from "../constants/error-codes";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    let token: any = req.header('Authorization');
    token = token ? token.replace('Bearer ', '') : false;

    if (!token) {
        return next(new HttpError(
            STATUS.UNAUTHORIZED,
            ERROR_MESSAGES.NO_TOKEN_FOUND,
            null,
            ERROR_NAMES.UNAUTHORIZED,
            ERROR_CODES.UNAUTHORIZED_KEY
            ))
    }
    const data: any = jwt.verify(token, 'secret', (err, user) => {
        if (err) {
            return next(err);
        }

        UserModel.findOne({ _id: user._id}).then((user: any) => {
            req.user = user;
            next();
        }).catch((err) => {
            return next(err);
        })
    });
};
