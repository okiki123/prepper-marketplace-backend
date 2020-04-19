import {Request, Response, NextFunction} from 'express';
import {UserModel} from "../models/user.model";
import {Utils} from "../libs/utils";
import {SUCCESS_MESSAGES} from "../constants/success-message";
import {STATUS} from "../constants/status-code";
import {ReqValidators} from "../libs/req-validators";
import {ERROR_MESSAGES} from "../constants/error-message";
import {ERROR_CODES} from "../constants/error-codes";
import passport from 'passport';
import {HttpError} from "../exceptions/http.error";
import {BaseController} from "./base.controller";
import {LoginValidator} from "../validators/login.validator";

export class AuthController {
    static register = (req: Request, res: Response, next: NextFunction) => {
        const user = new UserModel();
        const postData = req.body;
        user.createUser(postData)
            .then((data) => {
                return Utils.sendJSONResponse(res, STATUS.RESOURCE_CREATED, {
                    message: SUCCESS_MESSAGES.createdSuccesfully('User')
                });
            }).catch((err) => {
             return next(err);
        });
    };

    static login = (req: Request, res: Response, next: NextFunction) => {
        const postData = req.body;
        BaseController.validate(postData, next, LoginValidator);

        return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
            if (err) {
                return next(err);
            }

            if (passportUser) {
                let user = passportUser;
                user.token = passportUser.generateJWT();
                user.password = undefined;
                user.salt = undefined;
                user = JSON.parse(JSON.stringify(user));
                return Utils.sendJSONResponse(res, STATUS.OK, user);
            }

            const authError = new HttpError(STATUS.UNAUTHORIZED,
                ERROR_MESSAGES.FAILED_LOGIN,
                [info.message],
                null,
                ERROR_CODES.UNAUTHORIZED_KEY);

            return next(authError);
        })(req, res, next);
    }
}
