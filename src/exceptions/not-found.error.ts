import {BaseError} from "./base.error";
import {STATUS} from "../constants/status-code";
import {ERROR_NAMES} from "../constants/error-names";
import {ERROR_CODES} from "../constants/error-codes";

export class NotFoundError extends BaseError{

    constructor(message = 'Not Found') {
        super(message);
        this.status = STATUS.NOT_FOUND;
        this.name = ERROR_NAMES.NOT_FOUND;
        this.code = ERROR_CODES.NOT_FOUND;
    }
}
