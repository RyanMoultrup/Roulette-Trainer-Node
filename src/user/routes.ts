import express from 'express'
import * as UserController from './http/controllers/user-controller'

const router = express.Router()

router.post('/users', UserController.create)

export default router