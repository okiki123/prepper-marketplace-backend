export abstract class BaseError extends Error {
    status;
    message;
    errors;
    name;
    code;
    errmsg;

    protected constructor(message, errors?, name?, code?) {
        super(message);
        this.message = message;
        this.errors = errors;
        this.name = name;
        this.code = code;
    }
}
