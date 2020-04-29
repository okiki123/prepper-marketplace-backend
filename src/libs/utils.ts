import {ERROR_MESSAGES} from "../constants/error-message";
import {NotFoundError} from "../exceptions/not-found.error";
import {UserModel as User} from "../models/user.model";

export class Utils {
    static sendJSONResponse(res, status, data) {
        res.status(status).json(data);
        return res.end();
    }

    static handleNotFound(item, next) {
        const notFoundError =  new NotFoundError(ERROR_MESSAGES.notExist(item));
        return next(notFoundError);
    }

    static async checkExistence(id, next, item, entity) {
        await item.findOne({_id: id}).then((data) => {
            if (!data) {
                return Utils.handleNotFound(entity, next);
            }
            return data._id;
        }).catch((err) => {
            return next(err);
        })
    }
}
