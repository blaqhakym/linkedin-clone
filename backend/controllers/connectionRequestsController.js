import expressAsyncHandler from "express-async-handler";
import User from "../models/User.js";


export const fetchAllRequests = expressAsyncHandler(async (req, res) => {
  const userId = req.params.userId

  const findUserRequests = await User.findById(userId).populate('connectionRequests', 'name email profileImage')

  const connectionRequests = findUserRequests.connectionRequests

  res.json({requests: connectionRequests, status: 'OK'}).status(200)
})