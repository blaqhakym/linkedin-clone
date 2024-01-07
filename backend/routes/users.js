import express from "express";

const router = express.Router();
import {
  emailVerification,
  getUser,
  getUsers,
  patchDescription,
  registerUser,
  loginUser
} from "../controllers/userController.js";
import verifyJwt from "../utils/verifyJwt.js";


//('/users/')
router
  .get("/:userId", getUsers) //users not connected
  .post("/register", registerUser) //register a user
  .get("/verify/:token", emailVerification) //send email verification
  .post("/login", loginUser);//login

 
router.route("/profile/:userId")
  .get(verifyJwt,getUser)//get a user profile
  .patch(verifyJwt, patchDescription);//update session user's description


export default router;
