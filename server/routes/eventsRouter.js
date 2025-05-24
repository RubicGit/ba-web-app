// packages
import express from "express";

// files
import {
  addEvent,
  editEvent,
  removeEvent,
  toggleGlobal,
} from "../controllers/eventsPerms.js";
import userAuth from "../middleware/userAuth.js";

const eventsRouter = express.Router();

eventsRouter.post("/event-add", userAuth, addEvent);
eventsRouter.post("/event-edit", userAuth, editEvent);
eventsRouter.post("/event-remove", userAuth, removeEvent);
eventsRouter.post("/event-global", userAuth, toggleGlobal);

export default eventsRouter;
