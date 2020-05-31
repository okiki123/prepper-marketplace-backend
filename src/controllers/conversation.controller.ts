import {Request, Response, NextFunction} from "express";
import {BaseController} from "./base.controller";
import {ReqValidators} from "../libs/req-validators";
import {ERROR_MESSAGES} from "../constants/error-message";
import {Utils} from "../libs/utils";
import fs from "fs";
import {LessonModel as Lesson} from "../models/lesson.model";
import {ConversationModel as Conversation} from "../models/conversation.model";
import {STATUS} from "../constants/status-code";
import {SUCCESS_MESSAGES} from "../constants/success-message";
import {ConversationValidator} from "../validators/Conversation.validator";
import {Storage} from "../config/storage";

const storage = Storage.initialize();
export class ConversationController extends BaseController {
    static all = async (req: Request, res: Response, next: NextFunction) => {
        ReqValidators.IdValidate(req.params.id, next, ERROR_MESSAGES.failedToget('Conversations'));
        await Utils.checkExistence(req.params.id, next, Lesson, 'Lesson');
        Conversation.find({lesson: req.params.id}).then(async (data: any) => {
            if (!data) {
                Utils.handleNotFound('Conversation', next);
            }
            let lesson;
            await Lesson.findById(req.params.id).then((data) => {
                lesson = data;
            });
            return Utils.sendJSONResponse(res, STATUS.OK, {data, lesson});
        }).catch((err) => {
            return next(err);
        });
    };

    static new = async (req: Request, res: Response, next: NextFunction) => {
        ReqValidators.IdValidate(req.params.id, next, ERROR_MESSAGES.failedToSave('Conversation'));
        await Utils.checkExistence(req.params.id, next, Lesson, 'Lesson');
        const postData = req.body;
        BaseController.validate(postData, next, ConversationValidator);
        if (Array.isArray(postData)) {
            let arr: any[] = [];
            postData.forEach(function (item) {
                let obj = {
                    ...item,
                    ...{lesson: req.params.id}
                };
                arr.push(obj);
            });
            Conversation.insertMany(arr).then((conversation: any) => {
                Lesson.findOneAndUpdate(
                    {_id: req.params.id},
                    {$push: {conversations: conversation._id}}).then((data) => {
                    return Utils.sendJSONResponse(res, STATUS.RESOURCE_CREATED, conversation);
                }).catch(err => next(err));
            }).catch(err => next(err))
        } else {
            const conversation = new Conversation({...postData, ...{lesson: req.params.id}});
            conversation.save().then((conversation) => {
                Lesson.findOneAndUpdate(
                    {_id: req.params.id},
                    {$push: {conversations: conversation._id}}).then((data) => {
                    return Utils.sendJSONResponse(res, STATUS.RESOURCE_CREATED, conversation);
                }).catch(err => next(err));
            }).catch((err) => {
                return next(err);
            });
        }
    };

    static edit = async (req: Request, res: Response, next: NextFunction) => {
        const ids = [req.params.id, req.params.conversationId];
        ReqValidators.IdValidate(ids, next, ERROR_MESSAGES.failedToSave('Conversation'));
        await Utils.checkExistence(req.params.id, next, Lesson, 'Lesson');
        await Utils.checkExistence(req.params.conversationId, next, Conversation, 'Conversation');
        const postData = req.body;
        BaseController.validate(postData, next, ConversationValidator);
        const lessonData = {...postData, ...{updatedAt: new Date()}};
        Conversation.findByIdAndUpdate({_id: req.params.conversationId}, lessonData, {new: true}).then((data) => {
            return Utils.sendJSONResponse(res, STATUS.OK, {
                message: SUCCESS_MESSAGES.updatedSuccessfuly('Conversation'),
                data
            });
        }).catch((err) => {
            return next(err);
        });
    };

    static newImage = async (req, res, next: NextFunction) => {
        ReqValidators.IdValidate(req.params.id, next, ERROR_MESSAGES.failedToSave('Conversation'));
        await Utils.checkExistence(req.params.id, next, Lesson, 'Lesson');
        if(!req.files){
            Utils.sendJSONResponse(res, 400, {"message": "Image required"});
            return;
        }
        if(!req.fields){
            Utils.sendJSONResponse(res, 400, {"message": "Caption required"});
            return;
        }
        const oldPath = req.files.file.path;
        const newPath = `public/pictures/${req.files.file.name}`;
        fs.readFile(oldPath, function (err, data) {
            if (err) {
                return next(err);
            }

            // Write the file
            fs.writeFile(newPath, data, function (err) {
                if (err) {
                    return next(err);
                }
            });
            storage.upload(newPath, {
                gzip: true,
                metadata: {
                    cacheControl: 'public, max-age=31536000',
                },
            }).then(async (data) => {
                console.log('Image uploaded successfully');
                const imgUrl = await data[0].metadata.mediaLink;

                const newConversation = new Conversation({
                    lesson: req.params.id,
                    type: "image",
                    image: {
                        caption: req.fields.caption,
                        url: imgUrl
                    }
                });
                newConversation.save().then((conversation) => {
                    Lesson.update({ _id: req.params.id },{ $push:{ conversations:conversation._id}},function(err) {
                        if (err) { return next(err); }
                        Utils.sendJSONResponse(res, 200, conversation);
                        return;
                    });
                }).catch((err) => {
                return next(err)
            });

            // Delete the file
            fs.unlink(oldPath, function (err) {
                if (err) throw err;
                console.log('File deleted!');
            });
        });
    });
    };

    static editImage = async (req, res, next: NextFunction) => {
        const ids = [req.params.id, req.params.conversationId];
        ReqValidators.IdValidate(ids, next, ERROR_MESSAGES.failedToSave('Conversation'));
        await Utils.checkExistence(req.params.id, next, Lesson, 'Lesson');
        await Utils.checkExistence(req.params.conversationId, next, Conversation, 'Conversation');
        console.log(req.files);
        if ('file' in req.files) {
            const oldPath = req.files.file.path;
            const newPath = `public/pictures/${req.files.file.name}`;
            fs.readFile(oldPath, function (err, data) {
                if (err) {
                    return next(err);
                }

                // Write the file
                fs.writeFile(newPath, data, function (err) {
                    if (err) {
                        return next(err);
                    }
                });
                storage.upload(newPath, {
                    gzip: true,
                    metadata: {
                        cacheControl: 'public, max-age=31536000',
                    },
                }).then(async (data) => {
                    console.log('Image uploaded successfully');
                    const imgUrl = await data[0].metadata.mediaLink;

                    const conversationData = {
                        lesson: req.params.id,
                        type: "image",
                        image: {
                            caption: req.fields.caption,
                            url: imgUrl
                        }
                    };

                    Conversation.findOneAndUpdate({_id: req.params.conversationId}, conversationData, { new: true }).then((conversation) => {
                        return Utils.sendJSONResponse(res, STATUS.OK, {data: conversation})
                    });

                    // Delete the file
                    fs.unlink(oldPath, function (err) {
                        if (err) throw err;
                        console.log('File deleted!');
                    });
                });
            });
        } else {
            Conversation.findOne({_id: req.params.conversationId}).then((conversation: any) => {
                const conversationData = {
                    lesson: req.params.id,
                    type: "image",
                    image: {
                        caption: req.fields.caption,
                        url: conversation.image.url
                    }
                };
                Conversation.findOneAndUpdate({_id: req.params.conversationId}, conversationData, { new: true }).then((conversation) => {
                    return Utils.sendJSONResponse(res, STATUS.OK, {data: conversation})
                });
            })
        }
    };

    static delete = async (req: Request, res: Response, next: NextFunction) => {
        const ids = [req.params.id, req.params.conversationId];
        ReqValidators.IdValidate(ids, next, ERROR_MESSAGES.failedToSave('Conversation'));
        await Utils.checkExistence(req.params.id, next, Lesson, 'Lesson');
        await Utils.checkExistence(req.params.conversationId, next, Conversation, 'Conversation');
        Conversation.findByIdAndDelete({_id: req.params.conversationId}).then(async (data: any) => {
            const lesson = new Lesson({_id: req.params.id});
            await lesson.removeConversation(req.params.conversationId, next);
            return Utils.sendJSONResponse(res, STATUS.OK, {
                message: SUCCESS_MESSAGES.deletedSuccessfully('Conversation')
            });
        });
    };
};
