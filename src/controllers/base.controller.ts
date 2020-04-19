export class BaseController {
    static validate = (data, next, validatorClass) => {
        const validator = new validatorClass(data, next);
        validator.validate();
    }
}
