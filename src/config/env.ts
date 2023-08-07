import cors from 'cors';
import morgan from 'morgan';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import express, { Application } from 'express';
import sessionMiddleware from "../auth/http/middlewares/session.middleware";
import passport from 'passport'
import passportLocal from 'passport-local'
import cookieParser from 'cookie-parser';
import session from 'express-session';
import bcrypt from 'bcryptjs';
import Passport from './passport';

// const __dirname = dirname(fileURLToPath(import.meta.url));

export function setEnvironment(app: Application): void {
    if (process.env.NODE_ENV !== 'production') {
        setDevEnv(app);
    } else {
        // setProdEnv(app);
    }
}

function setDevEnv(app: Application): void {
    console.log('Setting development environment')
    process.env.NODE_ENV = 'development'
    app.use(express.json())
    app.use(express.urlencoded({extended: true}));
    app.use(morgan('dev'))
    
    Passport(passport)
    
    app.use(cors())
}

// function setProdEnv(app: Application): void {
//     console.log('Setting the production environment')
//     app.use(express.json())
//     app.use(express.static(`${__dirname}/../dist`))
//     app.use(sessionMiddleware)
// }
