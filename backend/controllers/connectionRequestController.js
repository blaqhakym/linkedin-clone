import expressAsyncHandler from "express-async-handler";
import User from "../models/User.js";

export const sendConnection = expressAsyncHandler(async(req, res)=> {
  const {requestedUserId, userId} = req.body;

  // add userId to requested user 
  const addToRequestedUser = await User.findByIdAndUpdate(requestedUserId, {$push:{connectionRequests: userId}})

  //add requestedUserId to user's sent requests list
  await User.findByIdAndUpdate(userId, { $push: { sentConnectionRequests: requestedUserId } })
  
  res.json({message: 'request sent', status: 'OK'}).status(200)
})

export const fetchAllRequests = expressAsyncHandler(async (req, res) => {
  const userId = req.body;

  const findUserRequests = await User.findById(userId).populate(
    "connectionRequests",
    "name email profileImage"
  );

  const connectionRequests = findUserRequests.connectionRequests;

  res.json({ requests: connectionRequests, status: "OK" }).status(200);
});