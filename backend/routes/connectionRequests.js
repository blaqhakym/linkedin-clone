import express from "express";
import { fetchAllRequests, sendConnection } from "../controllers/connectionRequestController.js";


const router = express();

router.route('/').post("/request", sendConnection).get('/all', fetchAllRequests);

export default router;