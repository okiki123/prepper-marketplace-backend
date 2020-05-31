import {BaseModelInterface} from "./base-model.interface";

export interface ConversationModelInterface extends BaseModelInterface {
    lesson: any;
    type: any;
    message: string;
    image: {
        caption: string;
        url: string;
    };
    question: {
        question: string;
        option1: string;
        option2: string;
        option3: string;
        option4: string;
        answer: string;
        failureMessage: string;
        successMessage: string;
    };
    approve: boolean;
    removeCourse(id, next): any;
    delete(): any;
    getTitle(id, next): any
}
