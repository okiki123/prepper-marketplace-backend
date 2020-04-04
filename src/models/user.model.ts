import {Model, model, Schema} from 'mongoose';
import {UserModelInterface} from '../interfaces/user-model.interface';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import {ERROR_MESSAGES} from "../constants/error-message";

export let UserSchema: Schema<UserModelInterface> = new Schema({
    username: {type: String, required: true, unique: true},
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (value: any) => validator.isEmail(value),
            message: ERROR_MESSAGES.INVALID_EMAIL
        },
    },
    firstname: {type: String, required: !this.isNew},
    lastname: {type: String, required: !this.isNew},
    address: {
        street1: {type: String, required: !this.isNew},
        street2: {type: String},
        city: {type: String, required: !this.isNew},
        postalCode: {type: String}
    },
    password: {type: String, required: true},
    token: {type: String},
    salt: {type: String},
    createdAt: {type: Date, required: true, default: Date.now},
    updatedAt: {type: Date, required: false},
    noOfLogin: {type: Number, default: 0},
});
UserSchema.pre<UserModelInterface>('save', function (next) {
    this.hashPassword(this.password);
    next();
});

UserSchema.methods.load = function (data) {
    this.username = data.username || this.username;
    this.email = data.email || this.email;
    this.password = data.password || this.password;
    this.createdAt = data.createdAt || this.createdAt;
    this.updatedAt = data.updatedAt || this.updatedAt;
};

UserSchema.methods.hashPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.password = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.validatePassword = function (password) {
    let passwordHash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return passwordHash === this.password
};

UserSchema.methods.createUser = function (userData) {
    this.load(userData);
    return this.save();
};

UserSchema.methods.updateUser = function (userData) {
    return this.findByIdAndUpdate(this.id, userData, {new: true});
};

UserSchema.methods.generateJWT = function () {
    return jwt.sign({
        id: this._id,
        email: this.email
    }, 'secret', {expiresIn: "7d"});
};

export const UserModel: Model<UserModelInterface> = model<UserModelInterface>('user', UserSchema);
