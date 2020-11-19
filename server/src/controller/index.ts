import { Router } from 'express'
import userController from './user'

const router = Router()

router.use('/user', userController)

export default router
