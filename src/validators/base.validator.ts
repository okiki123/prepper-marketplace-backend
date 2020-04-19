import {ObjectID} from "mongodb";
import {NextFunction} from "express";
import {RequestValidationError} from "../exceptions/request-validation.error";
import {ERROR_MESSAGES} from "../constants/error-message";

export class BaseValidator {
    errors: string[] = [];
    postData: any;
    next: NextFunction;

    constructor(postData, next) {
        this.postData = postData;
        this.next = next;
    }

    validateFields = (field, fieldName: string, type?: string, required: boolean = true) => {
        if (required && !field) {
            this.errors.push(`${fieldName} is required`);
        } else if (field && type && typeof field !== type) {
            this.errors.push(`${fieldName} must be ${type}`);
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
