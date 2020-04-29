export const ERROR_MESSAGES = {
    USER_NOT_EXIST: 'Username does not exist',
    INCORRECT_PASSWORD: 'The password you entered is incorrect',
    INVALID_EMAIL: 'Email is invalid',
    FAILED_LOGIN: 'Login failed',
    SOMETHING_WENT_WRONG: 'Something went wrong',
    NO_TOKEN_FOUND: 'No Bearer token Found in header',
    INVALID_ID: 'The id is not valid',
    undefinedRoute: (route) => `The route ${route} does not exist on this server`,
    failedToget: (entity) => `Failed to get ${entity}`,
    failedToSave: (entity: any) => `Failed to save ${entity}`,
    failedToUpdate: (entity: any) => `Failed to update ${entity}`,
    failedToDelete: (entity: any) => `Failed to delete ${entity}`,
    notExist: (user: any) => `${user} does not exist`
};
