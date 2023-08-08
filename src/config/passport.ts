import fs from 'fs'
import path from 'path';
import { PassportStatic } from 'passport'
import { User } from '../user/model/user-model'
import { IUserDocument } from '../user/interfaces/user-document-interface'
import { Strategy as JWTStrategy, ExtractJwt, JwtFromRequestFunction } from 'passport-jwt'

const pathToKey = path.join(__dirname, '../..', 'id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');

interface jwtOptions {
    jwtFromRequest: JwtFromRequestFunction
    secretOrKey: string
    algorithms: string[]
}

const options: jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUB_KEY,
    algorithms: ['RS256']
}

/**
 * Initializes JWT authentication strategy for the given passport instance.
 * 
 * This function sets up the JWT strategy with the given options. When a JWT is received,
 * the function will attempt to find a user with the ID contained in the JWT's "sub" claim.
 * 
 * @param {PassportStatic} passport - The passport instance to attach the strategy to.
 * 
 * @callback done 
 * @param {any} error - An error object if there was an issue, or `null` if there was none.
 * @param {IUserDocument | false} user - The user document if found, or `false` if not found.
 * @param {any} [info] - Optional additional information about the authentication process.
 */
export default (passport: PassportStatic) => {
    passport.use(new JWTStrategy(options, (payload, done) => {
        User.findOne({ _id: payload.sub })
            .then((user: IUserDocument | null) => {
                if (user) return done(null, user)
                return done(null, false)
            }).catch(err =>  done({ error: err }, false))
    }));
};
