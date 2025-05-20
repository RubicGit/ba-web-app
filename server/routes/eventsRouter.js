// packages
import express from "express";

// files
import librarianAuth from "../middleware/LibrarianAuth";
import { librarianLend } from "../controllers/libController";

const eventsRouter = express.Router();

eventsRouter.post("/librarian-lend", librarianAuth, librarianLend);
eventsRouter.post("/librarian-fine", librarianAuth, librarianFine);
eventsRouter.post("/librarian-returned", librarianAuth, librarianReturned);

export default eventsRouter;
