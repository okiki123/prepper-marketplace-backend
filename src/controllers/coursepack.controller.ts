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
import {CourseModel as Course} from "../models/course.model";

export class CoursepackController extends BaseController {
    static all = async (req: Request, res: Response, next: NextFunction) => {
        ReqValidators.IdValidate(req.params.id, next, ERROR_MESSAGES.failedToget('Coursepacks'));
        await Utils.checkExistence(req.params.id, next, User, 'User');
        CoursePack.find({user: req.params.id}).populate('userModel').then((data: any) => {
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

    static new = async (req: Request, res: Response, next: NextFunction) => {
        ReqValidators.IdValidate(req.params.id, next, ERROR_MESSAGES.failedToSave('Coursepacks'));
        await Utils.checkExistence(req.params.id, next, User, 'User');
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
        const ids = [req.params.id, req.params.coursepackId];
        ReqValidators.IdValidate(ids, next, ERROR_MESSAGES.failedToSave('Coursepacks'));
        await Utils.checkExistence(req.params.id, next, User, 'User');
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

    static delete = async (req: Request, res: Response, next: NextFunction) => {
        const ids = [req.params.id, req.params.coursepackId];
        ReqValidators.IdValidate(ids, next, ERROR_MESSAGES.failedToSave('Coursepacks'));
        await Utils.checkExistence(req.params.id, next, User, 'User');
        CoursePack.findByIdAndDelete({_id: req.params.coursepackId}).then(async (data: any) => {
            console.log(data);
            await data.courses.forEach(async (id) => {
                const course = new Course({_id: id});
                await course.delete(id, next);
            });
            return Utils.sendJSONResponse(res, STATUS.OK, {
                message: SUCCESS_MESSAGES.deletedSuccessfully('Coursepack')
            })
        }).catch((err) => {
           return next(err);
        });
    };
}
