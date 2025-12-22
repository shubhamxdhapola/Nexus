import express from 'express'
import { getUserInfo, googleSignIn, loginUser, logoutUser, registerUser } from '../controllers/auth.controller.js'
import { authenticate } from '../middlewares/authenticate.js'

const router = express.Router()

router.post('/login', loginUser)
router.post('/register', registerUser)
router.post('/google-signin', googleSignIn)
router.get('/get-user-info', authenticate, getUserInfo)
router.post('/logout', authenticate, logoutUser)

export default router