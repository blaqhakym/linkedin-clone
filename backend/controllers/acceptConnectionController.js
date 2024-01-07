import expressAsyncHandler from "express-async-handler";
import User from "../models/User.js";


// "/connections/accept"
export const acceptConnection = expressAsyncHandler(async (req, res) => {
  const { userId, requestId } = req.body
 await User.findByIdAndUpdate(userId, { $push: { connections: requestId }, $pull: { connectionRequests: requestId } })
  
await User.findByIdAndUpdate(requestId, {
    $push: { connections: userId },
    $pull: { sentConnectionRequests: userId },
  });

  // addToConnectedUsers.save()
  // addUserToRequestConnectedUsers.save();

res.json("user request accepted").status(200)
});