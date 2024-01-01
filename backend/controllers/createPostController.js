import expressAsyncHandler from "express-async-handler";
import User from "../models/User.js";
import Post from "../models/Post.js";

export const createPost = expressAsyncHandler(async (req, res) => {
  const {description, imageUrl, userId } = req.body
  
if(!findUser) return res.status(404).json('user not found')

  
  const newPost = await Post.create({
    description, imageUrl, createdAt:Date.now(), postedBy:userId
  })

  res.status(201).json({status: 'created', post: newPost})
})