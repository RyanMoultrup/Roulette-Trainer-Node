import { Application } from 'express'
import gameRoutes from './game/routes'
import userRoutes from './user/routes'
import authRoutes from './auth/routes'


export function registerRoutes(app: Application): void {
    app.use('/api', gameRoutes)
    app.use('/api', userRoutes)
    app.use(authRoutes)
}
