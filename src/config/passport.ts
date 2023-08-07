import { PassportStatic } from 'passport'
import { Strategy as JWTStrategy, ExtractJwt, JwtFromRequestFunction } from 'passport-jwt'
import { User } from '../user/model/user-model'
import { IUserDocument } from '../user/interfaces/user-document-interface'

interface jwtOptions {
  jwtFromRequest: JwtFromRequestFunction
  secretOrKey: string
  algorithms: string[]
}

const options: jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY || 'jvns',
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
  passport.use(new JWTStrategy(options, async (payload, done) => {

    User.findOne({ _id: payload.sub }, (err: any, user: IUserDocument) => {
      if (err) return done({ error: err }, false)
      if (user) return done(null, user)
      return done(null, false)
    })

  }));
};