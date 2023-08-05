import { Application } from 'express'
import gameRoutes from './game/routes';

export function registerRoutes(app: Application): void {
    app.use('/api', gameRoutes);
}
