import express, { Application } from 'express'
import dotenv from 'dotenv'
import { registerRoutes } from './routes'
import { setEnvironment } from './config/env'
import { mongo } from './config/mongo'

const init = (): Application => {
    const result = dotenv.config();

    if (result.error) {
        throw result.error;
    }

    const app = express();

    mongo.connect()

    setEnvironment(app)
    registerRoutes(app)

    return app
}

export default init
