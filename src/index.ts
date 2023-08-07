import express, { Application } from 'express'
import dotenv from 'dotenv'
import { registerRoutes } from './routes'
import { setEnvironment } from './config/env'
import { mongo } from './config/mongo'

dotenv.config()

const init = (): Application => {
    const app = express();

    mongo.connect()

    setEnvironment(app)
    registerRoutes(app)

    return app
}

export default init
