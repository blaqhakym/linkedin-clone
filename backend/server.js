// dependencies
import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors'
import dotenv from 'dotenv'

//db 
import connectDb from './config/connectDb.js';

//routes 
import register from './routes/register.js'
import verifyEmail from './routes/verifyEmail.js'
import login from './routes/login.js'
import userProfile from "./routes/userProfile.js";
import users from "./routes/users.js";
import connectionsRoute from './routes/connections.js'
import connectionRequestRoute from "./routes/connectionRequests.js";
import acceptRequest from "./routes/acceptRequest.js";
import connectionRequestsRoute from './routes/connectionRequests.js'
import createRoute from './routes/createRoute.js';


dotenv.config()

connectDb()

const app = express ()
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors())
const PORT = process.env.PORT


app.use('/register', register)
app.use('/verify', verifyEmail)
app.use('/login', login)

// endpoint to get the user's profile
app.use("/profile", userProfile);

// get all users
app.use("/users", users);

// send a connection request
app.use("/connection-request", connectionRequestRoute);

//show all connctions requests
app.use("/connection-request/:userId", connectionRequestsRoute);

//accept connection request
app.use('/connection-request/accept', acceptRequest);

// fetch all connections of a user
app.use('/connections/:userId', connectionsRoute)


// todo: 
// endpoint to create a post, fetch all posts
app.use('/posts', createRoute)



// // endpoint to like a post
// app.use('like-post/:postId')

// // endpoint to update user description
// app.use('profile/:userId')


mongoose.connection.once("open", () => {
  console.log("database connected");
  app.listen(PORT, () => console.log("server running on port " + PORT));
});