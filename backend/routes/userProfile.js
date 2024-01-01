import { Router } from "express";

const router = Router();
import { getUser, patchDescription } from "../controllers/userController.js";

router.route("/:userId").get(getUser).patch(patchDescription);

export default router;
