import expressAsyncHandler from "express-async-handler";
import User from "../models/User.js";

export const connectionRequest = expressAsyncHandler(async(req, res)=> {
  const {requestedUserId, userId} = req.body;

  // add userId to requested user 
  const addToRequestedUser = await User.findByIdAndUpdate(requestedUserId, {$push:{connectionRequests: userId}})

  //add requestedUserId to user's sent requests list
  const addToSentRequest = await User.findByIdAndUpdate(userId, { $push: { sentConnectionRequests: requestedUserId } })
  
  res.json({message: 'request sent', status: 'OK'}).status(200)
})