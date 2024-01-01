import express from 'express'
import { fetchAllRequests } from '../controllers/connectionRequestsController.js'

const router = express()

router.get('/', fetchAllRequests)

export default router