import cors from 'cors';
import morgan from 'morgan';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import express, { Application } from 'express';
import sessionMiddleware from "../auth/http/middlewares/session.middleware";

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
    app.use(morgan('dev'))
    app.use(cors())
    // app.use(express.logger())
    // app.use(sessionMiddleware)
}

// function setProdEnv(app: Application): void {
//     console.log('Setting the production environment')
//     app.use(express.json())
//     app.use(express.static(`${__dirname}/../dist`))
//     app.use(sessionMiddleware)
// }
