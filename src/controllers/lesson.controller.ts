import {Request, Response, NextFunction} from "express";
import {BaseController} from "./base.controller";
import {ReqValidators} from "../libs/req-validators";
import {ERROR_MESSAGES} from "../constants/error-message";
import {Utils} from "../libs/utils";
import {CourseModel as Course} from "../models/course.model";
import {LessonModel as Lesson} from "../models/lesson.model";
import {STATUS} from "../constants/status-code";
import {CoursePackModel as CoursePack} from "../models/coursepack.model";
import {LessonValidator} from "../validators/lesson.validator";
import {SUCCESS_MESSAGES} from "../constants/success-message";

export class LessonController extends BaseController {
    static all = async (req: Request, res: Response, next: NextFunction) => {
        ReqValidators.IdValidate(req.params.id, next, ERROR_MESSAGES.failedToget('Lessons'));
        await Utils.checkExistence(req.params.id, next, Course, 'Course');
        Lesson.find({course: req.params.id}).then((data: any) => {
            if (!data) {
                Utils.handleNotFound('Lesson', next);
            }
            return Utils.sendJSONResponse(res, STATUS.OK, data);
        }).catch((err) => {
            return next(err);
        });
    };

    static new = async (req: Request, res: Response, next: NextFunction) => {
        ReqValidators.IdValidate(req.params.id, next, ERROR_MESSAGES.failedToSave('Lesson'));
        await Utils.checkExistence(req.params.id, next, Course, 'Course');
        const postData = req.body;
        BaseController.validate(postData, next, LessonValidator);
        const lessonData = {
            name: postData.name,
            course: req.params.id,
        };
        const lesson = new Lesson(lessonData);
        lesson.save().then((lesson) => {
            Course.findOneAndUpdate(
                {_id: req.params.id},
                {$push: {lessons: lesson._id}}).then((data) => {
                return Utils.sendJSONResponse(res, STATUS.RESOURCE_CREATED, lesson);
            }).catch(err => next(err));
        }).catch((err) => {
            return next(err);
        });
    };

    static edit = async (req: Request, res: Response, next: NextFunction) => {
        const ids = [req.params.id, req.params.lessonId];
        ReqValidators.IdValidate(ids, next, ERROR_MESSAGES.failedToSave('Lessons'));
        await Utils.checkExistence(req.params.id, next, Course, 'Course');
        await Utils.checkExistence(req.params.lessonId, next, Lesson, 'Lesson');
        const postData = req.body;
        BaseController.validate(postData, next, LessonValidator);
        const lessonData = {...postData, ...{updatedAt: new Date()}};
        Lesson.findByIdAndUpdate({_id: req.params.lessonId}, lessonData, {new: true}).then((data) => {
            return Utils.sendJSONResponse(res, STATUS.OK, {
                message: SUCCESS_MESSAGES.updatedSuccessfuly('Lesson'),
                data
            });
        }).catch((err) => {
            return next(err);
        });
    };

    static delete = async (req: Request, res: Response, next: NextFunction) => {
        const ids = [req.params.id, req.params.lessonId];
        ReqValidators.IdValidate(ids, next, ERROR_MESSAGES.failedToDelete('Lesson'));
        await Utils.checkExistence(req.params.id, next, Course, 'Course');
        await Utils.checkExistence(req.params.lessonId, next, Lesson, 'Lesson');
        Lesson.findByIdAndDelete({_id: req.params.lessonId}).then(async (data: any) => {
            const course = new Course({_id: req.params.id});
            await course.removeLesson(req.params.lessonId, next);
            return Utils.sendJSONResponse(res, STATUS.OK, {
                message: SUCCESS_MESSAGES.deletedSuccessfully('Lesson')
            });
        });
    };
}
