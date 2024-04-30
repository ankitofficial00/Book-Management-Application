import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controllers.js";

import authenticateToken from "../middlewares/authenticateToken.js";
import express from "express";

registerUser;
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", authenticateToken, logoutUser);

export default router;
