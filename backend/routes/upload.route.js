import express from 'express'
import multer from 'multer'
import NexusStorage from '../config/cloudinary.js'
import { uploadImage } from '../controllers/upload.controller.js'

const router = express.Router()
const upload = multer({storage : NexusStorage})

router.post('/', upload.single('image'), uploadImage)

export default router