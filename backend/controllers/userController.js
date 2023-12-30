import expressAsyncHandler from "express-async-handler";
import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";

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
  const user = await User.findById(userId).populate("connections", "_id");
  if (!user) return res.json("user not found").status(StatusCodes.NOT_FOUND);

  const connections = user.connections.map((c) => c._id);

  // get users not connected
  const unconnectedTo = await User.find({
    _id: { $ne: user._id, $nin: connections },
  });
if(!unconnectedTo.length >0)  return res.json({ status: "OK", data: "No unconnected users" }).status(200);
  return res
    .json({status: "OK", data: unconnectedTo })
    .status(200);
});