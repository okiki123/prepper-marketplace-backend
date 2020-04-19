import {BaseValidator} from "./base.validator";
import {RequestValidationError} from "../exceptions/request-validation.error";
import {ERROR_MESSAGES} from "../constants/error-message";

export class LoginValidator extends BaseValidator{
    validate() {
        this.validateFields(this.postData.username, 'Username', 'string');
        this.validateFields(this.postData.password, 'Password', 'number');
        if (this.hasErrors()) {
            const reqError = new RequestValidationError(ERROR_MESSAGES.FAILED_LOGIN, this.errors);

            return this.next(reqError);
        }
    }
}
