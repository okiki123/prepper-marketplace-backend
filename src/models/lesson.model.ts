import {Model, model, Schema} from 'mongoose';
import {LessonModelInterface} from "../interfaces/lesson-model.interface";
import {CourseModel, CourseSchema} from "./course.model";

export let LessonSchema: Schema = new Schema({
    name: {type: String, required: true, unique: true},
    course: { type: Schema.Types.ObjectId, ref: 'CourseModel', required: true},
    conversations: [{ type: Schema.Types.ObjectId, ref: 'ConversationModel'}],
    createdAt: {type: Date, required: true, default: Date.now},
    updatedAt: {type: Date, required: false},
});

LessonSchema.methods.load = function (data) {
    this.name = data.username || this.name;
    this.createdAt = data.createdAt || this.createdAt;
    this.updatedAt = data.updatedAt || this.updatedAt;
};

LessonSchema.methods.removeConversation = async function (id, next) {
    await LessonModel.findByIdAndUpdate(
        {_id: this._id},
        {$pull: {conversations: id}}
    ).then((data) => {
        return;
    }).catch((err) => {
        return next(err);
    });
};

LessonSchema.methods.delete = async function (id, next) {
    await LessonModel.findByIdAndDelete({_id: id}).then().catch(err => next(err));
};

export const LessonModel: Model<LessonModelInterface> = model<LessonModelInterface>('lessons', LessonSchema);
