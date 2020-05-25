import {Request, Response, NextFunction} from "express";
import {CoursePackModel, CoursePackModel as CoursePack} from "../models/coursepack.model";
import {CourseModel as Course} from "../models/course.model";
import {LessonModel as Lesson} from "../models/lesson.model";
import {Utils} from "../libs/utils";
import {STATUS} from "../constants/status-code";
import {ReqValidators} from "../libs/req-validators";
import {ERROR_MESSAGES} from "../constants/error-message";
import {BaseController} from "./base.controller";
import {SUCCESS_MESSAGES} from "../constants/success-message";
import {CourseValidator} from "../validators/course.validator";
import {CoursepackModelInterface} from "../interfaces/coursepack-model.interface";

export class CourseController extends BaseController {
    static all = async (req: Request, res: Response, next: NextFunction) => {
        ReqValidators.IdValidate(req.params.id, next, ERROR_MESSAGES.failedToget('Courses'));
        await Utils.checkExistence(req.params.id, next, CoursePack, 'Coursepack');
        Course.find({coursepack: req.params.id})
            .then(async (data: any) => {
                if (!data) {
                    Utils.handleNotFound('Course', next);
                }
                data.forEach((item) => {
                    item.lessons = item.lessons.length;
                });
                let coursepack: any;
                await CoursePackModel.findById(req.params.id).then((data: any) => {
                   coursepack = data;
                }).catch(err => next(err));
                return Utils.sendJSONResponse(res, STATUS.OK, {data, coursepack});
            }).catch((err) => {
                return next(err);
            });
    };

    static new = async (req: Request, res: Response, next: NextFunction) => {
        ReqValidators.IdValidate(req.params.id, next, ERROR_MESSAGES.failedToSave('Courses'));
        await Utils.checkExistence(req.params.id, next, CoursePack, 'Coursepack');
        const postData = req.body;
        BaseController.validate(postData, next, CourseValidator);
        const courseData = {
            name: postData.name,
            coursepack: req.params.id,
            lessons: []
        };
        const course = new Course(courseData);
        course.save().then((course) => {
            if (!course) {
                Utils.handleNotFound('Course', next);
            }
            CoursePack.findOneAndUpdate(
                {_id: req.params.id},
                {$push: {courses: course._id}}).then((data) => {
                return Utils.sendJSONResponse(res, STATUS.RESOURCE_CREATED, course);
                }).catch(err => next(err));
        }).catch((err) => {
            return next(err);
        });
    };

    static edit = async (req: Request, res: Response, next: NextFunction) => {
        const ids = [req.params.id, req.params.courseId];
        ReqValidators.IdValidate(ids, next, ERROR_MESSAGES.failedToSave('Courses'));
        await Utils.checkExistence(req.params.id, next, CoursePack, 'Coursepack');
        await Utils.checkExistence(req.params.courseId, next, Course, 'Course');
        const postData = req.body;
        BaseController.validate(postData, next, CourseValidator);
        const courseData = {...postData, ...{updatedAt: new Date()}};
        Course.findByIdAndUpdate({_id: req.params.courseId}, courseData, {new: true}).then((data) => {
            if (!data) {
                Utils.handleNotFound('Course', next);
            }
            return Utils.sendJSONResponse(res, STATUS.OK, {
                message: SUCCESS_MESSAGES.updatedSuccessfuly('Course'),
                data
            });
        }).catch((err) => {
            return next(err);
        });
    };

    static delete = async (req: Request, res: Response, next: NextFunction) => {
        const ids = [req.params.id, req.params.courseId];
        ReqValidators.IdValidate(ids, next, ERROR_MESSAGES.failedToDelete('Courses'));
        await Utils.checkExistence(req.params.id, next, CoursePack, 'Coursepack');
        await Utils.checkExistence(req.params.courseId, next, Course, 'Course');
        Course.findByIdAndDelete({_id: req.params.courseId}).then(async (data: any) => {
            const coursePack = new CoursePack({_id: req.params.id});
            await coursePack.removeCourse(req.params.courseId, next);
            await data.lessons.forEach(async (id) => {
                const lesson = new Lesson({_id: id});
                await lesson.delete(id, next);
            });
            return Utils.sendJSONResponse(res, STATUS.OK, {
                message: SUCCESS_MESSAGES.deletedSuccessfully('Course')
            })
        }).catch(err => next(err));
    };
}
