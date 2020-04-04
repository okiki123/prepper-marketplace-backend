import {BaseError} from "./base.error";
import {STATUS} from "../constants/status-code";
import {ERROR_CODES} from "../constants/error-codes";

export class RequestValidationError extends BaseError {

    constructor(message, errors) {
        super(message, errors);
        this.status = STATUS.BAD_REQUEST;
        this.code = ERROR_CODES.VALIDATION_ERROR;
        this.errors = errors;
    }
}
