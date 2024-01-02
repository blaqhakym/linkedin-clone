import expressAsyncHandler from "express-async-handler";
import User from "../models/User.js";

export const acceptConnection = expressAsyncHandler(async (req, res) => {
  const { userId, acceptedUserId } = req.body
  

  const addToConnectedUsers = await User.findByIdAndUpdate(userId, { $push: { connections: acceptedUserId }, $pull: { connectionRequests: acceptedUserId } })
  
  const addUserToRequestConnectedUsers = await User.findByIdAndUpdate(acceptedUserId, {
    $push: { connections: userId },
    $pull: { connectionRequests: userId },
  });

  // addToConnectedUsers.save()
  // addUserToRequestConnectedUsers.save();

res.json("user request accepted").status(200)
});