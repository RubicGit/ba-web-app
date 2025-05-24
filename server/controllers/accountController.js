import userModel from "../models/userModel.js";

function sendError(res, code, msg) {
  return res.status(code).json({ success: false, message: msg });
}

function sendSuccess(res, code, msg) {
  return res.status(code).json({ success: true, message: msg });
}

export const pfpChange = async (req, res) => {
  const { profileUrl } = req.body;
  const userId = req.userId;

  const user = await userModel.findById(userId);

  if (!profileUrl) {
    return sendError(res, 400, "Missing profile picture url");
  }

  try {
    user.profileUrl = profileUrl;

    await user.save();

    return sendSuccess(res, 200, "Successfully changed profile pictures");
  } catch (error) {
    return sendError(res, 500, error.message);
  }
};

export const passwordOTP = async (req, res) => {
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

export const passwordChange = async (req, res) => {
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

export const hwNotifs = async (req, res) => {
  const userId = req.userId;

  const user = await userModel.findById(userId);
  const hwNotifsPrev = user.hwNotifs;

  try {
    user.hwNotifs = !hwNotifsPrev;
    await user.save();

    return sendSuccess(res, 200, "Successfully toggled homework notifications");
  } catch (error) {
    return sendError(res, 500, error.message);
  }
};

export const libNotifs = async (req, res) => {
  const userId = req.userId;

  const user = await userModel.findById(userId);
  const libNotifsPrev = user.libNotifs;

  try {
    user.libNotifs = !libNotifsPrev;
    await user.save();

    return sendSuccess(res, 200, "Successfully toggled library notifications");
  } catch (error) {
    return sendError(res, 500, error.message);
  }
};

export const calNotifs = async (req, res) => {
  const userId = req.userId;

  const user = await userModel.findById(userId);
  const calNotifsPrev = user.calNotifs;

  try {
    user.calNotifs = !calNotifsPrev;
    await user.save();

    return sendSuccess(res, 200, "Successfully toggled calendar notifications");
  } catch (error) {
    return sendError(res, 500, error.message);
  }
};
