import express from "express";
import {
  createPost,
  fetchAllPosts,
} from "../controllers/createPostController.js";
import { postLike } from "../controllers/likePostController.js";
import verifyJwt from "../utils/verifyJwt.js";

const router = express.Router();

router
  .get("/", verifyJwt, fetchAllPosts)
  .post("/create", createPost)
  .patch("like/:postId/:userId", postLike);
export default router;
