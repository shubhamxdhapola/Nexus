import express from 'express'
import { authenticate } from '../middlewares/authenticate.js'
import { getUserProfile, updateProfile } from '../controllers/user.controller.js'

const router = express.Router()

router.patch('/update-profile', authenticate, updateProfile)
router.get('/:username', getUserProfile)

export default router