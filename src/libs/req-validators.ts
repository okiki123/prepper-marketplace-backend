export class ReqValidators {
    errors: string[] = [];

    validateFields = (field, fieldName: string, type?: string, required?: boolean) => {
        if (required && !field) {
            this.errors.push(`${fieldName} is required`);
        } else if (type && typeof field !== type) {
            this.errors.push(`${fieldName} must be ${type}`);
        }
    };

    hasErrors = () => {
        return this.errors.length > 0;
    };
}
