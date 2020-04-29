import {BaseValidator} from "./base.validator";
import {RequestValidationError} from "../exceptions/request-validation.error";
import {ERROR_MESSAGES} from "../constants/error-message";

export class CourseValidator extends BaseValidator {
    validate() {
        this.validateFields(this.postData.name, 'Name', 'string');
        if (this.hasErrors()) {
            const reqError = new RequestValidationError(ERROR_MESSAGES.failedToSave('Course'), this.errors);
            return this.next(reqError);
        }
    }
}
