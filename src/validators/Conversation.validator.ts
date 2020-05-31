import {BaseValidator} from "./base.validator";
import {RequestValidationError} from "../exceptions/request-validation.error";
import {ERROR_MESSAGES} from "../constants/error-message";

export class ConversationValidator extends BaseValidator {
    static TYPE_MESSAGE = 'message';
    static TYPE_QUESTION = 'question';
    static TYPE_IMAGE = 'image';

    validate() {
        if (Array.isArray(this.postData)) {
            this.postData.forEach((item) => {
                this.validateFields(item.message, 'Message', 'string');
                this.validateFields(item.type, 'Type', 'string');
            })
        }
        else {
            this.validateFields(this.postData.type, 'Type', 'string');
            switch (this.postData.type) {
                case ConversationValidator.TYPE_MESSAGE:
                    this.validateFields(this.postData.message, 'Message', 'string');
                    break;
                case ConversationValidator.TYPE_QUESTION:
                    this.validateQuestion();
                    break;
            }
        }
        if (this.hasErrors()) {
            const reqError = new RequestValidationError(ERROR_MESSAGES.failedToSave('Lesson'), this.errors);
            return this.next(reqError);
        }
    }

    validateQuestion() {
        const {question} = this.postData;
        this.validateFields(question.question, 'Question', 'string');
        this.validateFields(question.option1, 'Option 1', 'string');
        this.validateFields(question.option2, 'Option 2', 'string');
        this.validateFields(question.option3, 'Option 3', 'string');
        this.validateFields(question.option4, 'Option 4', 'string');
        this.validateFields(question.answer, 'Answer', 'string');
        this.validateFields(question.failureMessage, 'Failure Message', 'string');
        this.validateFields(question.successMessage, 'Success Message', 'string');
    }
}
