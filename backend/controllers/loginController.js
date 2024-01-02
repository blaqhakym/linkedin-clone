import User from "../models/User.js";
import expressAsyncHandler from "express-async-handler";
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'



export const loginUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body
  
  const findUser = await User.findOne({ email })
  
  if (!findUser) return res.json({status: "unauthorised", message: "user does not exist. If you do not have an account, please register first"}).status(401)
 
  
  const matchPassword = await bcryptjs.compare(password, findUser.password)

  if (!matchPassword) return res.json({status: "unauthorised", message:"password is not correct"}).status(401)
  
  if (!findUser.verified) return res.json("Please verify your email to proceed")
  
  const token = jwt.sign({ userId: findUser._id }, secretKey)
  
  return res.json({status: "OK", token}).status(200)
  
})

const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString('hex')

  return secretKey
}

const secretKey = generateSecretKey()

