import expressAsyncHandler from "express-async-handler";
import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { sendVerificationEmail } from "../utils/emailVerification.js";
import crypto from "crypto";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

//register a user
export const registerUser = expressAsyncHandler(async (req, res) => {
  const { name, email, password, image } = req.body;
  const existingUser = User.findOne({ email });

  if (!existingUser) {
    return res
      .json({ status: "Error", message: "user already exists" })
      .status(401);
  }
  const hashPassword = await bcryptjs.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashPassword,
    profileImage: image,
    verificationToken: crypto.randomBytes(20).toString("hex"),
  });

  sendVerificationEmail(user.email, user.verificationToken);

  return res.json("Registration successful").status(201);
});

//verify email
export const emailVerification = expressAsyncHandler(async (req, res) => {
  const token = req.params.token;
  const findUser = await User.findOne({ verificationToken: token });

  if (!findUser) return res.json("Not Found").status(404);

  await User.findOneAndUpdate(
    { verificationToken: token },
    { $set: { verified: true } }
  )
    .then((result) => {
      result.verificationToken = undefined;
      result.save();
      return res
        .json({ message: "Email verification successful", result })
        .status(200);
    })
    .catch((err) => {
      return res.json(err);
    });
  return res.json("Email verification failed").status(200);
});

//login
export const loginUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const findUser = await User.findOne({ email });

  if (!findUser)
    return res
      .json({
        status: "unauthorised",
        message: "user does not exist. Sign up first",
      })
      .status(401);

  const matchPassword = await bcryptjs.compare(password, findUser.password);

  if (!matchPassword)
    return res
      .json({ status: "unauthorised", message: "password is not correct" })
      .status(401);

  // if (!findUser.verified)
  //   return res.json("Please verify your email to login").status(400);

  const token = jwt.sign(
    { email: findUser.email, userId: findUser._id },
    process.env.JWT_SECRET,
    { expiresIn: 60 * 60 * 1000 }
  );
  const userDetail = {
    name: findUser.name,
    email: findUser.email,
    image: findUser.profileImage,
  };

  return res
    .json({
      message: `You are logged in as \n${findUser.name}`,
      token,
      userDetail,
    })
    .status(200);
});

//get a user's profile
export const getUser = expressAsyncHandler(async (req, res) => {
  const userId = req.params.userId;

  // find the user
  const user = await User.findById(userId);
  if (!user) return res.json({ message: "user not found" }).status(404);
  return res.status(StatusCodes.OK).json({ message: "User fetched", user });
});

// fetch users that are not connected to logged in user
export const getUsers = expressAsyncHandler(async (req, res) => {
  const userId = req.params.userId;

  // find the user's connections
  // const user = await User.findById(userId).populate("connections", "_id");
  // if (!user) return res.json("user not found").status(StatusCodes.NOT_FOUND);

  // const connections = user.connections.map((c) => c._id);

  // get users not connected
  const unconnectedTo = await User.find({
    _id: { $ne: userId },
    connections: { $nin: [userId] },
  });
  if (!unconnectedTo.length > 0) {
    return res.json({ status: "OK", data: "No unconnected users" }).status(200);
  }

  const data = unconnectedTo.map((u) => {
    return {
      id: u._id,
      name: u.name,
      email: u.email,
      image: u.profileImage,
      connectionRequests: u.connectionRequests,
    };
  });

  return res.json({ status: "OK", data }).status(200);
});

export const patchDescription = expressAsyncHandler(async (req, res) => {
  const { userDescription } = req.body;
  const userId = req.params.userId;
  await User.findByIdAndUpdate(userId, {
    userDescription,
  })
    .exec()
    .then((user) => res.json("updated successfully").status(200))
    .catch((err) =>
      console.log("there was a problem updating user description")
    );
});
