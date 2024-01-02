// dependencies
import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors'
import dotenv from 'dotenv'

//db 
import connectDb from './config/connectDb.js';

//routes 
// import register from './routes/register.js'
// import verifyEmail from './routes/verifyEmail.js'
// import login from './routes/login.js'
// import userProfile from "./routes/userProfile.js";
import users from "./routes/users.js";
import connectionsRoute from './routes/connections.js'
// import connectionRequestRoute from "./routes/connectionRequests.js";
// import acceptRequest from "./routes/acceptRequest.js";
// import connectionRequestsRoute from './routes/connectionRequests.js'
import posts from './routes/posts.js';
import likeRoute from './routes/likeRoute.js'

dotenv.config()

connectDb()

const app = express ()
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors())
const PORT = process.env.PORT


// app.use('/register', register)
// app.use('/verify', verifyEmail)
// app.use('/login', login)

// // endpoint to get the user's profile
// app.use("/profile", userProfile);

// users
app.use("/users", users);

// connections
app.use("/connections", connectionsRoute);

//show all connctions requests
// app.use("/connections/all/:userId", connectionRequestsRoute);

//accept connection request
// app.use('/connection-request/accept', acceptRequest);

// // fetch all connections of a user
// app.use('/connections/:userId', connectionsRoute)


// endpoint to create a post, fetch all posts, likes
app.use('/posts', posts)


// endpoint to like or unlike a post
app.use('like/:postId/:userId', likeRoute)



mongoose.connection.once("open", () => {
  console.log("database connected");
  app.listen(PORT, () => console.log("server running on port " + PORT));
});