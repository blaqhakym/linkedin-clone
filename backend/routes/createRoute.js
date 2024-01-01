import express from 'express'
import { createPost } from '../controllers/createPostController.js'

export default router = express()


router.post('/', createPost)
// export default router