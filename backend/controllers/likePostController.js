import expressAsyncHandler from "express-async-handler";
import Post from "../models/Post.js";

export const postLike = expressAsyncHandler(async (req, res) => {
  const { postId, userId } = req.params;

  //check if userId already likes this post
  const alreadyLiked = await Post.findById(postId, {
    likes: { $in: { by: userId } },
  });

  //update like
  if (alreadyLiked) {
    await Post.findByIdAndUpdate(postId, { likes: { $pull: { by: userId } } })
    return res.json('Post unliked')
  } else {
    await Post.findByIdAndUpdate(postId, {
      likes: { $push: { by: userId } },
    })
    return res.json("Post liked");
  }
});
