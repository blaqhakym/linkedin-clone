import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors'
import connectDb from './config/connectDb.js';
import dotenv from 'dotenv'

import register from './routes/register.js'
import verifyEmail from './routes/verifyEmail.js'
dotenv.config()

connectDb()

const app = express ()
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors())
const PORT = process.env.PORT


app.use('/register', register)
app.use('/verify', verifyEmail)

mongoose.connection.once("open", () => {
  console.log("database connected");
  app.listen(PORT, () => console.log("server running on port " + PORT));
});