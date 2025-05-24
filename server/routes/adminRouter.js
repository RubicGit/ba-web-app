// packages
import express from "express";

// files
import userAuth from "../middleware/userAuth.js";
import {
  blackList,
  roleAdd,
  roleRemove,
  userApprove,
} from "../controllers/adminPerms.js";

const adminRouter = express.Router();

adminRouter.post("/role-add", userAuth, roleAdd);
adminRouter.post("/role-remove", userAuth, roleRemove);
adminRouter.post("/user-approve", userAuth, userApprove);
adminRouter.post("/blacklist", userAuth, blackList);

export default adminRouter;
