import {Model, model, Schema} from 'mongoose';
import {CoursepackModelInterface} from "../interfaces/coursepack-model.interface";
import {Utils} from "../libs/utils";
import {STATUS} from "../constants/status-code";
import {SUCCESS_MESSAGES} from "../constants/success-message";

export let CoursePackSchema: Schema<CoursepackModelInterface> = new Schema({
    title: {type: String, required: true, unique: true},
    user: { type: Schema.Types.ObjectId, ref: 'userModel', required: true},
    courses: [{ type: Schema.Types.ObjectId, ref: 'CourseModel'}],
    price: {type: Number, required: true},
    approve: {type: Boolean, default: false},
    createdAt: {type: Date, required: true, default: Date.now},
    updatedAt: {type: Date, required: false},
});

CoursePackSchema.methods.load = function (data) {
    this.title = data.title || this.title;
    this.user = data.user || this.user;
    this.courses = data.courses || this.courses;
    this.price = data.price || this.price;
    this.approve = data.approve || this.approve;
    this.createdAt = data.createdAt || this.createdAt;
    this.updatedAt = data.updatedAt || this.updatedAt;
};

CoursePackSchema.methods.get = async function (id, next) {
    const self = this;
    await CoursePackModel.findById({_id: id}).then(function (data: CoursepackModelInterface | any) {
        if (!data) {
            Utils.handleNotFound('Coursepack', next);
        }
        self.load(data);
        return self;
    }).catch((err) => {
        return next(err);
    })
};

CoursePackSchema.methods.saveData = function (data) {
    this.load(data);
    return this.save();
};

CoursePackSchema.methods.removeCourse = async function (id, next) {
    await CoursePackModel.findByIdAndUpdate(
        {_id: this._id},
        {$pull: {courses: id}}
    ).then((data) => {
        return;
    }).catch((err) => {
        return next(err);
    });
};

CoursePackSchema.methods.getTitle = async function (id, next) {
     await CoursePackModel.findById(id).then((data: any) => {
         return data.title
     }).catch((err) => {
         return next(err);
     });
};

export const CoursePackModel: Model<CoursepackModelInterface> = model<CoursepackModelInterface>('coursepacks', CoursePackSchema);
