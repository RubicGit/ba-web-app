// packages
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";

// files
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import libRouter from "./routes/libRoutes.js";
import eventsRouter from "./routes/eventsRouter.js";
import hwRouter from "./routes/hwRoutes.js";
import accountRouter from "./routes/accountRoutes.js";

const app = express();
const port = process.env.PORT || 4000;
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true }));

// API Endpoints
app.get("/", (req, res) => {
  res.send("API is working");
});
app.use("/api/auth", authRouter);

// data
app.use("/api/user", userRouter);

// perms
app.use("/api/library", libRouter);
app.use("/api/events", eventsRouter);
app.use("/api/homework", hwRouter);
app.use("/api/account", accountRouter);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
