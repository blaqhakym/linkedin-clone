import express from 'express'
import { postLike } from '../controllers/likePostController.js'

const router = express()

router.post('/', postLike)

export default router