import {Request, Response, NextFunction} from 'express';
import {Utils} from "../libs/utils";
import {STATUS} from "../constants/status-code";

export class IndexController {
    static run = (req: Request, res: Response, next: NextFunction) => {
        return Utils.sendJSONResponse(res, STATUS.OK, {
            message: 'Works like Charm'
        });
    };
}
