import {Model, model, Schema} from 'mongoose';
import {CourseModelInterface} from "../interfaces/course-model.interface";
import {LessonModel} from "./lesson.model";

export let CourseSchema: Schema = new Schema({
    name: {type: String, required: true, unique: true},
    coursepack: { type: Schema.Types.ObjectId, ref: 'CoursePackModel', required: true},
    lessons: [{ type: Schema.Types.ObjectId, ref: 'LessonModel'}],
    createdAt: {type: Date, required: true, default: Date.now},
    updatedAt: {type: Date, required: false},
});

CourseSchema.methods.load = function (data) {
    this.name = data.username || this.name;
    this.coursepack = data.coursepack || this.coursepack;
    this.lessons = data.lessons || this.lessons;
    this.createdAt = data.createdAt || this.createdAt;
    this.updatedAt = data.updatedAt || this.updatedAt;
};

CourseSchema.methods.removeLesson = async function (id, next) {
    await CourseModel.findByIdAndUpdate(
        {_id: this._id},
        {$pull: {lessons: id}}
    ).then((data) => {
        return;
    }).catch((err) => {
        return next(err);
    });
};

CourseSchema.methods.delete = async function (id, next) {
    await CourseModel.findByIdAndDelete({_id: id}).then(async (data: any) => {
        data.lessons.forEach(async (id) => {
            const lesson = new LessonModel({_id: id});
            await lesson.delete(id, next);
        });
    }).catch(err => next(err));
};

export const CourseModel: Model<CourseModelInterface> = model<CourseModelInterface>('courses', CourseSchema);
