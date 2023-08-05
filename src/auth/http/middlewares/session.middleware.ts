import { NextFunction, Request, Response } from "express"
import session from 'express-session'

const sessionMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // try {
    //     return session({
    //         secret: process.env.SESSION_SECRET,
    //         resave: false,
    //         saveUninitialized: true
    //     })(req, res, next)
    // } catch (e) {
    //     console.log('session error: ', e)
    // }
}

export default sessionMiddleware