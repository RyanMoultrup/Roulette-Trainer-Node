import express, { Application } from 'express'
import dotenv from 'dotenv'
import { registerRoutes } from './routes'
import { setEnvironment } from './config/env'
import { mongo } from './config/mongo'

const init = (): Application => {
    const app = express();
    const port = process.env.PORT || 3000;
    dotenv.config()

    setEnvironment(app)
    registerRoutes(app)

    mongo.connect()

    return app
}

export default init
