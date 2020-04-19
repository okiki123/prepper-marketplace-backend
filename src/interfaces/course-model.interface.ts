import {BaseModelInterface} from "./base-model.interface";

export interface CourseModelInterface extends BaseModelInterface {
    name: string;
    coursepack: any;
    lessons: any[];
}
