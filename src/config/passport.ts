import passport from 'passport';
import passportLocal from 'passport-local';
import {UserModel} from "../models/user.model";
import {ERROR_MESSAGES} from "../constants/error-message";
import {UserModelInterface} from "../interfaces/user-model.interface";

export class PassportAuthenticate {
    public run() {
        const localStrategy = passportLocal.Strategy;
        passport.use(new localStrategy({
            usernameField: 'username',
            passwordField: 'password'
        }, (username, password, done) => {
            UserModel.findOne({username: username}).then(function (user: UserModelInterface | null) {
                if (!user) {
                    return done(null, false, {message: ERROR_MESSAGES.USER_NOT_EXIST});
                } else if (!user.validatePassword(password)) {
                    return done(null, false, {message: ERROR_MESSAGES.INCORRECT_PASSWORD});
                }

                return done(null, user)
            }).catch(done);
        }));
    }
}
