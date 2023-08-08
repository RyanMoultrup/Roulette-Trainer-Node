import { Router } from 'express';
import * as AuthController from './http/controllers/auth-controller'

const router = Router()

router.post('/register', AuthController.register)
router.post('/authenticate', AuthController.authenticate)

export default router
