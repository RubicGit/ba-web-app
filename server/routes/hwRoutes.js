// packages
import express from "express";

// files
import userAuth from "../middleware/userAuth.js";
import {
  assignHomework,
  autosaveDraft,
  checkPending,
  createHomework,
  markHomework,
  submitHomework,
  updateHomeworkStatus,
} from "../controllers/hwPerms.js";

const hwRouter = express.Router();

hwRouter.post("/assign", assignHomework);
hwRouter.post("/create", createHomework);
hwRouter.post("/marked", userAuth, markHomework);
hwRouter.post("/autosave-draft", userAuth, autosaveDraft);
hwRouter.post("/check-pending", checkPending);
hwRouter.post("/submit", submitHomework);
hwRouter.post("/set-status", updateHomeworkStatus);

export default hwRouter;
