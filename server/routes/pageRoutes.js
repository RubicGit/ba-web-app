// packages
import express from "express";

// files
import librarianAuth from "../middleware/LibrarianAuth";
import {
  baseEventsData,
  baseLibraryData,
  eventManagerData,
  librarianData,
  teacherData,
} from "../controllers/pageController";

const pageRouter = express.Router();

// perms

pageRouter.post("/librarian", librarianAuth, librarianData);
pageRouter.post("/events", eventsAuth, eventManagerData);
pageRouter.post("/homework", librarianAuth, teacherData);

// base

pageRouter.post("/library", baseLibraryData);
pageRouter.post("/calendar", baseEventsData);

pageRouter.post("/homework/student", StudentData);
pageRouter.post("/class-list/teacher", calendarStudentData);

export default pageRouter;
