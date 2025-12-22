import express from 'express'
import { createLink, deleteLink, getAllLinks, updateLink } from '../controllers/link.controller.js'
import { authenticate } from '../middlewares/authenticate.js'

const router = express.Router()

router.get('/', authenticate, getAllLinks)
router.post('/add', authenticate, createLink)
router.patch('/:id', authenticate, updateLink)
router.delete('/:id', authenticate, deleteLink)

export default router