import { Router } from "express";

const router = Router();
import {
  emailVerification,
  getUser,
  getUsers,
  patchDescription,
  registerUser,
} from "../controllers/userController.js";


import { loginUser } from "../controllers/loginController.js";

router
  .get("/:userId", getUsers)//users not connected
  .post("/register", registerUser)//register a user
  .get("/verify/:token", emailVerification) //send email verification
  .post("/login", loginUser);//login 

router.route("profile/:userId")
  .get(getUser)//get a user profile
  .patch(patchDescription);//update session user's description


export default router;
