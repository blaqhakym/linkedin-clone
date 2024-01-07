import expressAsyncHandler from "express-async-handler";
import User from "../models/User.js";
import Post from "../models/Post.js";
import dayjs from "dayjs";

export const createPost = expressAsyncHandler(async (req, res) => {
  const { description, imageUrl, userId } = req.body;

  if (!findUser) return res.status(404).json("user not found");
  const currentDate = dayjs();
  const formattedDate = currentDate.format("YYYY-MM-DD HH:mm:ss");

  const newPost = await Post.create({
    description,
    imageUrl,
    createdAt: formattedDate,
    postedBy: userId,
  });

  res.status(201).json({ status: "created", post: newPost });
});

export const fetchAllPosts = expressAsyncHandler(async (req, res) => {
  await Post.find()
    .exec()
    .then((posts) => {
    return  posts.length? res.json({ posts }).status(200): res.json([]).status(200);
    })
    .catch((err) => {
      console.log(err);
      res.json({ Error: "Error fetching posts" }).status(500);
    });
});
