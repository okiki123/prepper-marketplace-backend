import {ObjectID} from "mongodb";
import {NextFunction} from "express";
import {RequestValidationError} from "../exceptions/request-validation.error";
import {ERROR_MESSAGES} from "../constants/error-message";

export class ReqValidators {
    errors: string[] = [];

    validateFields = (field, fieldName: string, type?: string, required: boolean = true) => {
        if (required && !field) {
            this.errors.push(`${fieldName} is required`);
        } else if (field && type && typeof field !== type) {
            this.errors.push(`${fieldName} must be ${type}`);
        }
    };

    static IdValidate = (id, next: NextFunction, msg) => {
        if (Array.isArray(id)) {
            id.forEach((el) => {
                ReqValidators.validateId(el, next, msg)
            });
        } else {
            ReqValidators.validateId(id, next, msg)
        }
    };

    static validateId = (id, next: NextFunction, msg) => {
        if (!ObjectID.isValid(id)) {
            const reqError = new RequestValidationError(msg,
                [ERROR_MESSAGES.INVALID_ID]);
            return next(reqError);
        }
    };

    hasErrors = () => {
        return this.errors.length > 0;
    };
}
