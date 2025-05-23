// packages
import express from "express";

// files

const userRouter = express.Router();

userRouter.post("/data", userAuth, getUserData);

export default userRouter;
