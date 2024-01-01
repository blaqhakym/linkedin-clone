import expressAsyncHandler from "express-async-handler";
import Post from "../models/Post.js";

export const postLike = expressAsyncHandler(async (req, res) => {
  const { postId, userId } = req.params;

  const findPost = await Post.findByIdAndUpdate(postId, {
    $push: { likes: userId },
  });
});
