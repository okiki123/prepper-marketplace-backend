import {Request, Response, NextFunction} from "express";
import {UserModel as User} from "../models/user.model";
import {CoursePackModel as CoursePack} from "../models/coursepack.model";
import {Utils} from "../libs/utils";
import {STATUS} from "../constants/status-code";
import {ReqValidators} from "../libs/req-validators";
import {ERROR_MESSAGES} from "../constants/error-message";
import {CoursepackValidator} from "../validators/coursepack.validator";
import {BaseController} from "./base.controller";
import {SUCCESS_MESSAGES} from "../constants/success-message";

export class CoursepackController extends BaseController {
    static all = (req: Request, res: Response, next: NextFunction) => {
        ReqValidators.validateId(req.params.id, next, ERROR_MESSAGES.failedToget('Coursepacks'));
        Utils.checkExistence(req.params.id, next, User, 'User');
        CoursePack.find({user: req.params.id}).populate('lessons').then((data: any) => {
            if (!data) {
                Utils.handleNotFound('Coursepack', next);
            }
            data.forEach((item) => {
                item.courses = item.courses.length;
            });
            return Utils.sendJSONResponse(res, STATUS.OK, data);
        }).catch((err) => {
           return next(err);
        });
    };

    static new = (req: Request, res: Response, next: NextFunction) => {
        ReqValidators.validateId(req.params.id, next, ERROR_MESSAGES.failedToget('Coursepacks'));
        Utils.checkExistence(req.params.id, next, User, 'User');
        const postData = req.body;
        BaseController.validate(postData, next, CoursepackValidator);
        const coursepackData = {
            title: postData.title,
            price: postData.price,
            courses: [],
            user: req.params.id
        };
        const coursepack = new CoursePack();
        coursepack.saveData(coursepackData).then((coursepack) => {
                if (!coursepack) {
                    Utils.handleNotFound('Coursepack', next);
                }
                return Utils.sendJSONResponse(res, STATUS.RESOURCE_CREATED, coursepack);
            }).catch((err) => {
                return next(err);
            });
    };

    static edit = async (req: Request, res: Response, next: NextFunction) => {
        ReqValidators.validateId(req.params.id, next, ERROR_MESSAGES.failedToSave('Coursepacks'));
        ReqValidators.validateId(req.params.coursepackId, next, ERROR_MESSAGES.failedToSave('Coursepacks'));
        Utils.checkExistence(req.params.id, next, User, 'User');
        const postData = req.body;
        BaseController.validate(postData, next, CoursepackValidator);
        const coursepackData = {...postData, ...{updatedAt: new Date()}};
        CoursePack.findByIdAndUpdate({_id: req.params.coursepackId}, coursepackData, {new: true}).then((data) => {
           if (!data) {
               Utils.handleNotFound('Coursepack', next);
           }
           return Utils.sendJSONResponse(res, STATUS.OK, {
               message: SUCCESS_MESSAGES.updatedSuccessfuly('Coursepack'),
               data
           });
        }).catch((err) => {
            return next(err);
        });
    };

    static delete = (req: Request, res: Response, next: NextFunction) => {
        ReqValidators.validateId(req.params.id, next, ERROR_MESSAGES.failedToDelete('Coursepacks'));
        ReqValidators.validateId(req.params.coursepackId, next, ERROR_MESSAGES.failedToDelete('Coursepacks'));
        Utils.checkExistence(req.params.id, next, User, 'User');
        CoursePack.findByIdAndDelete({_id: req.params.coursepackId}).then((data) => {
            if (!data) {
                Utils.handleNotFound('Coursepack', next)
            }
            return Utils.sendJSONResponse(res, STATUS.OK, {
                message: SUCCESS_MESSAGES.deletedSuccessfully('Coursepack')
            });
        }).catch((err) => {
           return next(err);
        });
    };
}
