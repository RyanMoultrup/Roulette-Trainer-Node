import cors from 'cors';
import morgan from 'morgan';
import express, { Application } from 'express';
import passport from 'passport'
import passportStrategy from './passport';

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
    
    passportStrategy(passport)
    app.use(passport.initialize());
    
    app.use(cors())
}

// function setProdEnv(app: Application): void {
//     console.log('Setting the production environment')
//     app.use(express.json())
//     app.use(express.static(`${__dirname}/../dist`))
//     app.use(sessionMiddleware)
// }
