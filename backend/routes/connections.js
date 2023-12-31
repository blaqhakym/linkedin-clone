import express from "express";
import { getConnections } from "../controllers/connectionController.js";
import {
  fetchAllRequests,
  sendConnection,
} from "../controllers/connectionRequestController.js";
import { acceptConnection } from "../controllers/acceptConnectionController.js";

const router = express.Router();
router
  .get("/:userId", getConnections)
  .get("/requests/:userId", fetchAllRequests)
  .post("/requests", sendConnection)
  .patch("/accept", acceptConnection);

export default router;
