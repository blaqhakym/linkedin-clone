import expressAsyncHandler from "express-async-handler";
import User from "../models/User.js";

export const getConnections = expressAsyncHandler(async (req, res) => {
  const userId = req.params.userId;

  const user = await User.findById(userId)
    .populate("connections", "name createdAt profileImage")
  if (!user) return res.status(400).json("User not found");
  const connections = user.connections;
  connections.length === 0
    ? res.json({status: "OK", message: "No connection"})
    : res.status(200).json({ status: "OK", connections });
});
