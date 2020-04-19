import {Model, model, Schema} from 'mongoose';
import {CourseModelInterface} from "../interfaces/course-model.interface";

export let CourseSchema: Schema<CourseModelInterface> = new Schema({
    name: {type: String, required: true, unique: true},
    coursepack: { type: Schema.Types.ObjectId, ref: 'UserModel', required: true},
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

export const CourseModel: Model<CourseModelInterface> = model<CourseModelInterface>('courses', CourseSchema);
