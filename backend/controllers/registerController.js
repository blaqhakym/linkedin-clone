import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import { sendVerificationEmail } from "../utils/emailVerification.js";



const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, image } = req.body;
  const existingUser = User.findOne({ email });

  if (!existingUser) {
    return res.json({ message: "user already exists" }).status(401);
  }

  const user = await User.create({
    name,
    email,
    password,
    profileImage: image,
  });

  sendVerificationEmail(user.email, user.verificationToken);

  return res.json("Registration successful").status(201);
});

export default registerUser;
