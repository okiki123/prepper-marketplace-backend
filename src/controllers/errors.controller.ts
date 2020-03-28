import {Request, Response, NextFunction} from "express";
import {HttpException} from "../exceptions/http.exception";
import {STATUS} from "../constants/status-code";
import {ERROR_MESSAGES} from "../constants/error-message";
import {Utils} from "../libs/utils";
import {ERROR_NAMES} from "../constants/error-names";
import {ERROR_CODES} from "../constants/error-codes";

export class ErrorsController {
    static errorHandler(err: HttpException, req: Request, res: Response, next: NextFunction) {
        switch (err.name) {
            case ERROR_NAMES.VALIDATION:
                let errors: any[] = [];
                for (let error in err.errors) {
                    if (err.errors.hasOwnProperty(error)) {
                        errors.push(err.errors[error].message)
                    }
                }
                return Utils.sendJSONResponse(res, STATUS.BAD_REQUEST, {
                    message: ERROR_MESSAGES.failedToSave('User'),
                    errors,
                    code: ERROR_NAMES.VALIDATION
                });
            case ERROR_NAMES.MONGO:
                console.log(err);
                    return Utils.sendJSONResponse(res, STATUS.BAD_REQUEST, {
                        code: err.code,
                        message: ERROR_MESSAGES.failedToSave('User'),
                        errors: [err.errmsg]
                    });

            default:
                console.log(err);
                const status = err.status || STATUS.INTERNAL_SERVER_ERROR;
                return Utils.sendJSONResponse(res, status, {
                    message: err.message || ERROR_MESSAGES.SOMETHING_WENT_WRONG,
                    code: err.code || ERROR_CODES.UNKNOWN_ERROR,
                    errors: err.errors || []
                });
        }
    }

    static undefinedRoute(req: Request, res: Response, next: NextFunction) {
        const notFoundError = new HttpException(STATUS.NOT_FOUND,
            ERROR_MESSAGES.undefinedRoute(req.url), null, null,
            ERROR_CODES.NOT_FOUND);

        return next(notFoundError);
    }
}
