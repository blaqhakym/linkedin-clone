import express from 'express'
import { getConnections } from '../controllers/connectionController.js'



const router = express()

router.get('/', getConnections)


export default router