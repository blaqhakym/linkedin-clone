import { Router } from "express";

const router = Router();
import { getUsers } from "../controllers/userController.js";

router.get("/:userId", getUsers);

export default router;
