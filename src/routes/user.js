import { Router } from 'express'
import { updateUser, removeUser } from '../controllers/userController'

const router = Router()

router.put('/', updateUser)
router.delete('/', removeUser)

export default router
