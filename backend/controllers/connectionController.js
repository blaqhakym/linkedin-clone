import expressAsyncHandler from "express-async-handler";
import User from "../models/User.js";

//connections/:userId
export const getConnections = expressAsyncHandler(async (req, res) => {
  const userId = req.params.userId;

  const user = await User.findById(userId)
    .populate("connections", "name createdAt profileImage")
  if (!user) return res.status(400).json("User not found");
  const connections = user.connections;
  !connections.length
    ? res.json({status: "OK", data: "No connection to display"})
    : res.status(200).json({ status: "OK", data: connections });
});
