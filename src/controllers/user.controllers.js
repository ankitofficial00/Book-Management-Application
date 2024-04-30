import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken";

// REGISTER A NEW USER
const registerUser = async (req, res) => {
  try {
    // taken the data from the frontend

    const { email, userName, fullName, password } = req.body;

    // input validation

    if (!email || !userName || !password || !fullName) {
      return res.status(400).json({
        success: false,
        message: "all fields are required",
      });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { userName }],
    });

    if (existingUser) {
      return res.status(401).json({
        success: false,
        message: "user already exists",
      });
    }

    const user = await User.create({
      email,
      userName,
      password,
      fullName,
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "something went wrong while registering the new user",
      });
    }
    return res.status(200).json({
      success: true,
      message: "user created successfully",
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

// LOGIN CONTROLLER

const loginUser = async (req, res) => {
  try {
    // destructure the data from the frontend
    const { userName, password } = req.body;
    // input validation

    if (!userName || !password) {
      return res
        .status(403)
        .json({ success: false, message: "given fields are required" });
    }

    // CHECK THE USER

    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "this user is not exist",
      });
    }

    // compare the password with hashed password
    const passwordChecked = await user.isPasswordCorrect(password);
    if (!passwordChecked) {
      return res
        .status(401)
        .json({ success: false, message: "this password is not correct" });
    }

    // generate the jwt token
    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRY,
      }
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    // clear cookie data where token is stored
    return res.status(202).cookie("accessToken", token, options).json({
      success: true,
      message: "login successfully",
      token,
    });
  } catch (error) {
    console.log(error.message);
  }
};

const logoutUser = async (req, res) => {
  try {
    await User.findById(req.user.userId);

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .clearCookie("accessToken", options)
      .json({ success: true, message: "log out successfully" });
  } catch (error) {
    console.log(error.message);
  }
};
export { registerUser, loginUser, logoutUser };
