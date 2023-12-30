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
app.use("/users", users);

mongoose.connection.once("open", () => {
  console.log("database connected");
  app.listen(PORT, () => console.log("server running on port " + PORT));
});