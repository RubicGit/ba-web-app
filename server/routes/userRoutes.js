// packages
import express from "express";

// files
import userAuth from "../middleware/userAuth.js";
import { getUserData } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/data", userAuth, getUserData);

export default userRouter;
