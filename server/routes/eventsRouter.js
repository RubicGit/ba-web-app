// packages
import express from "express";

// files
import librarianAuth from "../middleware/LibrarianAuth";
import {
  addEvent,
  editEvent,
  removeEvent,
  toggleGlobal,
} from "../controllers/eventsPerms";

const eventsRouter = express.Router();

eventsRouter.post("/event-add", userAuth, addEvent);
eventsRouter.post("/event-edit", userAuth, editEvent);
eventsRouter.post("/event-remove", userAuth, removeEvent);
eventsRouter.post("/event-global", userAuth, toggleGlobal);

export default eventsRouter;
