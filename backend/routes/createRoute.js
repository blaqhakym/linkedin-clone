import express from "express";
import { createPost, fetchPosts } from "../controllers/createPostController.js";

const router = express();

router.post("/create", createPost).get("/", fetchPosts);
export default router;
