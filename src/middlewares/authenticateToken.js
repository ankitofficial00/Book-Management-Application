import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken";

const authenticateToken = async (req, res, next) => {
  try {
    // get the token from header
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    console.log(token);
    if (!token) {
      return res.status(404).json({ success: false, message: "Invalid token" });
    }

    const dedcodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(dedcodedToken?.userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "unauthorized user" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error.message);
  }
};

export default authenticateToken;
