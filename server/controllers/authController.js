// packages
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// files
import transporter from "../config/nodemailer.js";
import userModel from "../models/userModel.js";

// register controller

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  // checks if all fields are filled out
  if (!username || !email || !password) {
    return res.json({ success: false, message: "Please fill all fields" });
  }

  try {
    // check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
    }

    // generate hashed password
    const hashedPassword = await bcrypt.hash(password, 10);

    // send email
    const mailOptions = {
      from: "onboarding@resend.dev",
      to: email,
      subject: "Welcome to the BeteSeb Academy App",
      html: `<p>Welcome ${username}, to the BeteSeb Academy App, where you can get access to lots of information you otherwise would have to go through multiple hoops to get. Calendar dates, library books, and such, all publicly available info, you can access right here</p>`,
    };

    const isDev = process.env.NODE_ENV !== "production";
    if (isDev) {
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error("Email not sent:", err);
        } else {
          console.log("Email content (simulated):\n", info.message.toString());
        }
      });
    }

    // create user
    const user = await userModel.create({
      name: username,
      email: email,
      password: hashedPassword,
    });
    await user.save();

    // generates token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // success message
    res.json({ success: true, message: "Successfully registered" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// login controller

export const login = async (req, res) => {
  const { email, password } = req.body;

  // checks if all fields are filled out
  if (!email || !password) {
    return res.json({ success: false, message: "Please fill all fields" });
  }

  try {
    // finds user using email and checks if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User doesn't exist" });
    }

    // checks if password is correct
    const isMatching = await bcrypt.compare(password, user.password);
    if (!isMatching) {
      return res.json({ success: false, message: "Invalid password" });
    }

    // generates token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // success message
    res.json({ success: true, message: "Successfully logged in" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// logout controller

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    return res.json({ success: true, message: "Successfully logged out" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// verify account controller

export const sendVerifyOtp = async (req, res) => {
  try {
    const userId = req.userId;
    console.log("Sending OTP to user:", userId);
    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({ success: false, message: "user doesn't exist" });
    }

    if (user.isAccountVerified) {
      return res.json({ success: false, message: "user already verified" });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));

    user.verifyOTP = otp;
    user.verifyOTPExpiresAt = Date.now() + 24 * 60 * 60 * 1000;

    await user.save();

    const mailOptions = {
      from: "onboarding@resend.dev",
      to: user.email,
      subject: "Verify OTP",
      html: `<p>Here is your verify one time pass:<strong> ${otp} </strong></p>`,
    };

    const isDev = process.env.NODE_ENV !== "production";
    if (isDev) {
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error("Email not sent:", err);
        } else {
          console.log("Email content (simulated):\n", info.message.toString());
        }
      });
    }

    res.json({ success: true, message: "Verify OTP sent" });
  } catch (error) {
    res.json({ success: false, message: error });
  }
};

export const verifyAccount = async (req, res) => {
  const { otp } = req.body;
  const userId = req.userId;

  if (!userId || !otp) {
    res.json({ success: false, message: "Missing Details" });
  }

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      res.json({ success: false, message: "User not found" });
    }

    if (user.verifyOTP === "") {
      res.json({ success: false, message: "OTP not sent" });
    }

    if (otp !== user.verifyOTP) {
      res.json({ success: false, message: "Incorrect OTP" });
    }

    if (user.verifyOTPExpiresAt < Date.now()) {
      res.json({ success: false, message: "OTP has expired" });
    }

    user.isVerified = true;
    user.verifyOTP = "";
    user.verifyOTPExpiresAt = "";

    await user.save();

    res.json({ success: true, message: "User has been verified" });
  } catch (error) {
    res.json({ success: false, message: error });
  }
};

// reset password controller

export const sendResetOtp = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await userModel.findById(userId);

    if (user.isAccountVerified) {
      res.json({ success: false, message: "user already verified" });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));

    user.resetOTP = otp;
    user.resetOTPExpiresAt = Date.now() + 24 * 60 * 60 * 1000;

    await user.save();

    const mailOptions = {
      from: "onboarding@resend.dev",
      to: user.email,
      subject: "Reset OTP",
      html: `<p>Here is your reset one time pass:<strong> ${otp} </strong></p>`,
    };

    const isDev = process.env.NODE_ENV !== "production";
    if (isDev) {
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error("Email not sent:", err);
        } else {
          console.log("Email content (simulated):\n", info.message.toString());
        }
      });

      res.json({ success: true, message: "Reset OTP sent" });
    }
  } catch (error) {
    res.json({ success: false, message: error });
  }
};

export const resetPassword = async (req, res) => {
  const { otp, password } = req.body;
  const userId = req.userId;

  if (!userId || !otp) {
    res.json({ success: false, message: "Missing Details" });
  }

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      res.json({ success: false, message: "User not found" });
    }

    if (user.resetOTP === "") {
      res.json({ success: false, message: "OTP not sent" });
    }

    if (otp !== user.resetOTP) {
      res.json({ success: false, message: "Incorrect OTP" });
    }

    if (user.resetOTPExpiresAt < Date.now()) {
      res.json({ success: false, message: "OTP has expired" });
    }

    const newPassword = await bcrypt.hash(password, 10);

    user.password = newPassword;
    user.resetOTP = "";
    user.resetOTPExpiresAt = "";

    await user.save();

    res.json({ success: true, message: "Password has been changed" });
  } catch (error) {
    res.json({ success: false, message: error });
  }
};
