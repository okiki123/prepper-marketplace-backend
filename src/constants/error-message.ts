export const ERROR_MESSAGES = {
    USER_NOT_EXIST: 'Username does not exist',
    INCORRECT_PASSWORD: 'The password you entered is incorrect',
    INVALID_EMAIL: 'Email is invalid',
    FAILED_LOGIN: 'Login failed',
    SOMETHING_WENT_WRONG: 'Something went wrong',
    NO_TOKEN_FOUND: 'No Bearer token Found in header',
    undefinedRoute: (route) => `The route ${route} does not exist on this server`,
    failedToSave: (entity: any) => `Failed to save ${entity}`,
    failedToUpdate: (entity: any) => `Failed to update ${entity}`,
    notExist: (user: any) => `${user} does not exist`
};
