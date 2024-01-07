import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

const verifyJwt = expressAsyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({message: "redirect the user to login"});
  }
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "redirect the user to login" });
  }

  jwt.verify(token, process.env.jWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "redirect the user to login" });
    }

    req.user = decoded;
    next();
  });


});

export default verifyJwt;
