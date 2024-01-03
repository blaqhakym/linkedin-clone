import expressAsyncHandler from "express-async-handler";
import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { sendVerificationEmail } from "../utils/emailVerification.js";
import crypto from "crypto";
import bcryptjs from "bcryptjs";

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
    { $set: { verified: true} }
  )
    .then((result) => {
      result.verificationToken = undefined
      result.save()
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
        message:
          "user does not exist",
      })
      .status(401);  

  const matchPassword = await bcryptjs.compare(password, findUser.password);

  if (!matchPassword)
    return res
      .json({ status: "unauthorised", message: "password is not correct" })
      .status(401);

  // if (!findUser.verified)
  //   return res.json("Please verify your email to login").status(400);

  const token = jwt.sign({ userId: findUser._id }, secretKey);

  return res.json({ status: "OK", token }).status(200);
});

const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString("hex");

  return secretKey;
};
const secretKey = generateSecretKey();

//get a user's profile
export const getUser = expressAsyncHandler(async (req, res) => {
  const userId = req.params.userId;

  // find the user
  const user = await User.findById(userId);
  if (!user) return res.json("user not found").status(StatusCodes.NOT_FOUND);
  return res.status(StatusCodes.OK).json({ user });
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
    _id: { $ne: userId, connections: { $nin: [userId] } },
  });
  if (!unconnectedTo.length > 0)
    return res.json({ status: "OK", data: "No unconnected users" }).status(200);
  return res.json({ status: "OK", data: unconnectedTo }).status(200);
});

export const patchDescription = expressAsyncHandler(async (req, res) => {
  const { userDescription } = req.body;
  const userId = req.params.userId;

  await User.findByIdAndUpdate(userId, {
    userDescription,
  }).exec((err, result) => {
    if (err) return res.json("error: user not found");
    return res.json("user description updated").status(200);
  });
});
