export class HttpException extends Error{
    status;
    message;
    errors;
    name;
    code;
    errmsg;

    constructor(status, message, errors?, name?, code?) {
        super(message);
        this.status = status;
        this.message = message;
        this.errors = errors;
        this.name = name;
        this.code = code;
    }
}
