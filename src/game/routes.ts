import { Router } from 'express'
import * as GameController from './http/controllers/game-controller'
import * as UserGameController from './http/controllers/user-game-controller'

const router = Router()

router.post('/games', GameController.create)
router.get('/games/:gameId', GameController.get)
router.get('/users/:userId/games', UserGameController.all)

export default router