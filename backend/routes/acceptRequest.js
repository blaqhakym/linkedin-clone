
import express from 'express'
import { acceptConnection } from '../controllers/acceptConnectionController.js'
const router = express()


router.post('/', acceptConnection)

export default router