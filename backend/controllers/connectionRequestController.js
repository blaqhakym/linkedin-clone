import expressAsyncHandler from "express-async-handler";
import User from "../models/User.js";

// /users/requests
export const sendConnection = expressAsyncHandler(async(req, res)=> {
  const {currentUserId, selectedUserId, } = req.body;

  // add currentUserId to requested user 
  const addToRequestedUser = await User.findByIdAndUpdate(selectedUserId, {$push:{connectionRequests: currentUserId}})

  //add selectedUserId to user's sent requests list
  await User.findByIdAndUpdate(currentUserId, { $push: { sentConnectionRequests: selectedUserId } })
  
  res.json({message: 'Request sent', status: 'OK'}).status(200)
})

export const fetchAllRequests = expressAsyncHandler(async (req, res) => {
  const userId = req.params.userId;

  const findUserRequests = await User.findById(userId).populate(
    "connectionRequests",
    "name email profileImage"
  );

  const connectionRequests = findUserRequests.connectionRequests;
  res.json({ requests: connectionRequests, status: "successful" }).status(200);
});