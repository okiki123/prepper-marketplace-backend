export class ReqValidators {
    errors: string[] = [];

    validateFields = (field, fieldName: string, type?: string, required: boolean = true) => {
        if (required && !field) {
            this.errors.push(`${fieldName} is required`);
        } else if (field && type && typeof field !== type) {
            this.errors.push(`${fieldName} must be ${type}`);
        }
    };

    hasErrors = () => {
        return this.errors.length > 0;
    };
}
