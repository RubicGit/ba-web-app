// packages
import express from "express";

// files
import userAuth from "../middleware/userAuth.js";
import {
  calNotifs,
  hwNotifs,
  libNotifs,
  passwordChange,
  passwordOTP,
  pfpChange,
} from "../controllers/accountController.js";

const accountRouter = express.Router();

accountRouter.post("/profile-change", userAuth, pfpChange);
accountRouter.post("/homework-notifs", userAuth, hwNotifs);
accountRouter.post("/calendar-notifs", userAuth, calNotifs);
accountRouter.post("/library-notifs", userAuth, libNotifs);
accountRouter.post("/password-otp", userAuth, passwordOTP);
accountRouter.post("/password-change", userAuth, passwordChange);

export default accountRouter;
