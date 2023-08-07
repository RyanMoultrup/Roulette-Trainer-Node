import { Router } from 'express'
import * as UserController from './http/controllers/user-controller'

const router = Router()

router.get('/users', UserController.all)
router.get('/users/:userId', UserController.get)
router.post('/users', UserController.create)

export default router