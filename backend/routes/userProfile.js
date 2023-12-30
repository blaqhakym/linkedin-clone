import { Router } from "express";

const router = Router();
import {getUser} from "../controllers/userController.js";

router.get("/:userId", getUser);

export default router;
