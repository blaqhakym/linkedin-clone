import express from "express";
import { connectionRequest } from "../controllers/connectionRequestController.js";

const router = express();

router.post("/", connectionRequest);

export default router;