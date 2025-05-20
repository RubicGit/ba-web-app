// packages
import express from "express";

// files
import {
  login,
  logout,
  register,
  resetPassword,
  sendResetOtp,
  sendVerifyOtp,
  verifyAccount,
} from "../controllers/authController.js";
import userAuth from "../middleware/userAuth.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);

authRouter.post("/send-verify-otp", userAuth, sendVerifyOtp);
authRouter.post("/verify-account", userAuth, verifyAccount);

authRouter.post("/send-reset-otp", userAuth, sendResetOtp);
authRouter.post("/reset-password", userAuth, resetPassword);

export default authRouter;
