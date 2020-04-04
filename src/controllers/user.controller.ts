import {Request, Response, NextFunction} from "express";
import {UserModel as User} from "../models/user.model";
import {Utils} from "../libs/utils";
import {STATUS} from "../constants/status-code";
import {ReqValidators} from "../libs/req-validators";
import {RequestValidationError} from "../exceptions/request-validation.error";
import {ERROR_MESSAGES} from "../constants/error-message";
import {SUCCESS_MESSAGES} from "../constants/success-message";
import {HttpError} from "../exceptions/http.error";
import {ERROR_CODES} from "../constants/error-codes";
import {UserModelInterface} from "../interfaces/user-model.interface";

export class UserController {
    static getProfile = (req: Request, res: Response, next: NextFunction) => {
        User.findOne({_id: req.params.id})
            .then((user: any) => {
                if (!user) {
                    Utils.handleNotFound('User', next);
                }
                user = UserController.formatUser(user);
                return Utils.sendJSONResponse(res, STATUS.OK, user)
            })
            .catch((err) => {
                return next(err);
            });
    };

    static updateProfile = (req: Request, res: Response, next: NextFunction) => {
        const reqValidator = new ReqValidators();
        reqValidator.validateFields(req.body.username, 'Username', 'string');
        reqValidator.validateFields(req.body.email, 'Email', 'string');
        if (reqValidator.hasErrors()) {
            const reqError = new RequestValidationError(ERROR_MESSAGES.failedToUpdate('User'), reqValidator.errors);
            return next(reqError);
        }

        const userData = {
            username: req.body.username,
            email: req.body.email
        };

        User.findByIdAndUpdate(req.params.id, userData, {new: true}).then((user) => {
            if (!user) {
                Utils.handleNotFound('User', next)
            }
            user = UserController.formatUser(user);
            return Utils.sendJSONResponse(res, STATUS.OK, {
                message: SUCCESS_MESSAGES.updatedSuccessfuly('Profile'),
                data: user
            })
        }).catch((err) => {
            return next(err);
        });
    };

    static updatePersonalDetails = (req: Request, res: Response, next: NextFunction) => {
        const reqValidator =  new ReqValidators();
        reqValidator.validateFields(req.body.firstname, 'Firstname', 'string');
        reqValidator.validateFields(req.body.lastname, 'Lastname', 'string');
        reqValidator.validateFields(req.body.address.street1, 'Street 1 Address', 'string');
        reqValidator.validateFields(req.body.address.street2, 'Street 2 Address', 'string', false);
        reqValidator.validateFields(req.body.address.city, 'City', 'string');
        reqValidator.validateFields(req.body.address.postalCode,'Postal Code', 'string', false);

        if (reqValidator.hasErrors()) {
            const reqError = new RequestValidationError(ERROR_MESSAGES.failedToUpdate('User'), reqValidator.errors);
            return next(reqError);
        }

        User.findByIdAndUpdate(req.params.id, req.body, {new: true}).then((user) => {
            if (!user) {
                Utils.handleNotFound('User', next);
            }

            user = UserController.formatUser(user);

            return Utils.sendJSONResponse(res, STATUS.OK, {
                message: SUCCESS_MESSAGES.updatedSuccessfuly('User'),
                data: user
            });
        }).catch((err) => {
            return next(err);
        });
    };

    static updatePassword = (req: Request, res: Response, next: NextFunction) => {
        const reqValidator = new ReqValidators();
        reqValidator.validateFields(req.body.currentPassword, 'Current Password', 'string');
        reqValidator.validateFields(req.body.newPassword, 'New Password', 'string');
        if (reqValidator.hasErrors()) {
            const reqError = new RequestValidationError(ERROR_MESSAGES.failedToUpdate('Password'), reqValidator.errors);
            return next(reqError);
        }

        User.findById(req.params.id).then((user: UserModelInterface | any) => {
            if (!user) {
                Utils.handleNotFound('User', next)
            }
            const isPasswordValid = user.validatePassword(req.body.currentPassword);
            // if (!isPasswordValid) {
            //     const httpError = new HttpError(STATUS.BAD_REQUEST,
            //         ERROR_MESSAGES.INCORRECT_PASSWORD,
            //         null,
            //         null,
            //         ERROR_CODES.UNAUTHORIZED_KEY);
            //
            //     return next(httpError);
            // }

            user.password = req.body.newPassword;
            user.save().then((user) => {
                return Utils.sendJSONResponse(res, STATUS.OK, {
                    message: SUCCESS_MESSAGES.updatedSuccessfuly('Password')
                });
            }).catch((err) => {
                return next(err)
            });

        }).catch((err) => {
            return next(err);
        });
    };

    static formatUser = (user) => {
        user.password = undefined;
        user.salt = undefined;
        return JSON.parse(JSON.stringify(user));
    };
}
