import {ERROR_MESSAGES} from "../constants/error-message";
import {NotFoundError} from "../exceptions/not-found.error";

export class Utils {
    static sendJSONResponse(res, status, data) {
        return res.status(status).json(data);
    }

    static handleNotFound(item, next) {
        const notFoundError =  new NotFoundError(ERROR_MESSAGES.notExist(item));
        return next(notFoundError);
    }
}
