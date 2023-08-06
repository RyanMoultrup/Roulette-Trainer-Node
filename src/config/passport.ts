import { PassportStatic } from 'passport'
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt'
import { get } from 'src/user/model/user-repository'


export default (passport: PassportStatic) => {
  passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY || 'jvns',
  },
  async (payload, done) => {
    const { errors, data: user } = await get(payload.id)
    if (errors) return done({ error: errors }, false)
    if (user) return done(null, user)
    return done(null, false)
  }));
};