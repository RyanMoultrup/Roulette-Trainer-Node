import { Router } from 'express'
import passport from 'passport'
import * as UserController from './http/controllers/user-controller'

const router = Router()

router.get('/users', UserController.all)
router.get('/users/:userId',  passport.authenticate('jwt', { session: false }), UserController.get)
router.post('/users', UserController.create)

export default router