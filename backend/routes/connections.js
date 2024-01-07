import express from "express";
import { getConnections } from "../controllers/connectionController.js";
import {
  fetchAllRequests,
  sendConnection,
} from "../controllers/connectionRequestController.js";
import { acceptConnection } from "../controllers/acceptConnectionController.js";

const router = express.Router();
router
  .get("/requests/:userId", fetchAllRequests)
  .post("/requests", sendConnection)
  .get("/all", getConnections)
  .patch("/accept", acceptConnection);

export default router;
