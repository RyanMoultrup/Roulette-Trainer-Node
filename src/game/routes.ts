import { Router } from 'express'
import * as GameController from './http/controllers/game-controller'
import * as UserGameController from './http/controllers/user-game-controller'

const router = Router()

router.post('/game', GameController.create)
router.get('/users/:userId/games', UserGameController.all)

export default router