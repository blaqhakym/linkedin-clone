import express from "express";
import { getConnections } from "../controllers/connectionController.js";
import {
  fetchAllRequests,
  sendConnection,
} from "../controllers/connectionRequestController.js";
import { acceptConnection } from "../controllers/acceptConnectionController.js";

const router = express.Router();

router.get("all", getConnections).patch("accept", acceptConnection);

router.route("/requests").get(fetchAllRequests).post(sendConnection);//fetch all request & send connection request
export default router;
