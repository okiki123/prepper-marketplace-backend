import {BaseError} from "./base.error";

export class HttpError extends BaseError{

    constructor(status, message, errors?, name?, code?) {
        super(message, errors, name, code);
        this.status = status;
    }
}
