import { Router } from "express";


const router = Router();
import registerUser from "../controllers/registerController.js";

router.post("/", registerUser);

export default router;
