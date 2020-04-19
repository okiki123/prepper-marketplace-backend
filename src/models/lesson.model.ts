import {Model, model, Schema} from 'mongoose';
import {LessonModelInterface} from "../interfaces/lesson-model.interface";

export let LessonSchema: Schema<LessonModelInterface> = new Schema({
    name: {type: String, required: true, unique: true},
    course: { type: Schema.Types.ObjectId, ref: 'CourseModel', required: true},
    createdAt: {type: Date, required: true, default: Date.now},
    updatedAt: {type: Date, required: false},
});

LessonSchema.methods.load = function (data) {
    this.name = data.username || this.name;
    this.createdAt = data.createdAt || this.createdAt;
    this.updatedAt = data.updatedAt || this.updatedAt;
};

export const LessonModel: Model<LessonModelInterface> = model<LessonModelInterface>('lessons', LessonSchema);
