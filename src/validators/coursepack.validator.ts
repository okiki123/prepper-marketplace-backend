import {BaseValidator} from "./base.validator";
import {RequestValidationError} from "../exceptions/request-validation.error";
import {ERROR_MESSAGES} from "../constants/error-message";

export class CoursepackValidator extends BaseValidator {
    validate() {
        this.validateFields(this.postData.title, 'Title', 'string');
        this.validateFields(this.postData.price, 'Price', 'number');
        if (this.hasErrors()) {
            const reqError = new RequestValidationError(ERROR_MESSAGES.failedToSave('Coursepack'), this.errors);
            return this.next(reqError);
        }
    }
}
