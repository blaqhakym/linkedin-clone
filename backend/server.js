// dependencies
import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';

//db 
import connectDb from './config/connectDb.js';

//routes 
import users from "./routes/users.js";
import connectionsRoute from './routes/connections.js'
import posts from './routes/posts.js';

dotenv.config()

connectDb()

const app = express ()
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors())
app.use(cookieParser())
const PORT = process.env.PORT



// users
app.use("/users", users);

// connections
app.use("/connections", connectionsRoute);

// endpoint to create a post, fetch all posts, likes
app.use('/posts', posts)


// endpoint to like or unlike a post
// app.use('like/:postId/:userId', likeRoute)



mongoose.connection.once("open", () => {
  console.log("database connected");
  app.listen(PORT, () => console.log("server running on port " + PORT));
});