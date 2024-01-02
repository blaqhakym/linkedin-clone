import { Router } from "express";

const router = Router();
import {
  getUser,
  getUsers,
  patchDescription,
} from "../controllers/userController.js";
import registerUser from "../controllers/registerController.js";
import emailVerification from "../controllers/emailVerificationController.js";
import { loginUser } from "../controllers/loginController.js";

router
  .get(":userId", getUsers)
  .post("register", registerUser)
  .patch(":token", emailVerification)
  .post("login", loginUser);

router.route("profile/:userId").get(getUser).patch(patchDescription);

// router.get("/:userId", getUsers);

export default router;
