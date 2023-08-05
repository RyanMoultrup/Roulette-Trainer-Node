import express from 'express'
import * as GameController from './http/controllers/game-controller'

const router = express.Router()

router.post('/game', GameController.create)

export default router