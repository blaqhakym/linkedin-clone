import express from 'express'
import { createPost } from '../controllers/createPostController.js'

const router = express()


router.post('/', createPost)
export default router