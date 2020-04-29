import {BaseModelInterface} from "./base-model.interface";

export interface LessonModelInterface extends BaseModelInterface {
    name: string;
    course: any;
    delete(id, next): any;
}
