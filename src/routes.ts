import { Application } from 'express'
import gameRoutes from './game/routes'
import userRoutes from './user/routes'
import authRoutes from './auth/routes'


export function registerRoutes(app: Application): void {
    app.use('/api/v1', gameRoutes)
    app.use('/api/v1', userRoutes)
    app.use(authRoutes)
}
