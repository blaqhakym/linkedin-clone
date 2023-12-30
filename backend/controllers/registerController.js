import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import { sendVerificationEmail } from "../utils/emailVerification.js";
import crypto from 'crypto'
import bcryptjs from 'bcryptjs'


const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, image } = req.body;
  const existingUser = User.findOne({ email });

  if (!existingUser) {
    return res.json({ message: "user already exists" }).status(401);
  }
  const hashPassword = await bcryptjs.hash(password, 10)

  const user = await User.create({
    name,
    email,
    password:hashPassword,
    profileImage: image,
    verificationToken: crypto.randomBytes(20).toString('hex')
  });

  sendVerificationEmail(user.email, user.verificationToken);

  return res.json("Registration successful").status(201);
});

export default registerUser;
