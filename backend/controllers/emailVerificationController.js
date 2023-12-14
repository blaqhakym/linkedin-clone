import expressAsyncHandler from "express-async-handler";
import User from "../models/User.js";
import {
  ReasonPhrases,
  StatusCodes,
} from "http-status-codes";

const emailVerification = expressAsyncHandler(async (req, res) => {
  const token = req.params.token;

  const findUser = await User.findOne({ verificationToken: token });

  if (!findUser)
    return res.json(ReasonPhrases.NOT_FOUND).status(StatusCodes.NOT_FOUND);

  // mark the user as verified

  findUser.verified = true;
  findUser.verificationToken = undefined;

  return res.json(ReasonPhrases.OK).status(StatusCodes.OK);
});


export default emailVerification