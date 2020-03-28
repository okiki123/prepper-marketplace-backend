import {BaseModelInterface} from "./base-model.interface";

export interface UserModelInterface extends BaseModelInterface {
    username: string;
    email: string;
    password: string;
    token: string;
    salt: string;
    createdAt: string
    updatedAt: string;
    noOfLogin: string;
    createUser(userData): any;
    validatePassword(password): boolean;
    generateJWT(): any;
    createUser(userData): any;
    hashPassword(password): any;
}
