import express from "express";
import { getConnections } from "../controllers/connectionController.js";
import {
  fetchAllRequests,
  sendConnection,
} from "../controllers/connectionRequestController.js";
import { acceptConnection } from "../controllers/acceptConnectionController.js";

const router = express();

router.get("all", getConnections).patch("accept", acceptConnection);

router.route("/requests").get(fetchAllRequests).post(sendConnection);
export default router;
