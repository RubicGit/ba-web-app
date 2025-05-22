// packages
import express from "express";

// files
import librarianAuth from "../middleware/LibrarianAuth.js";
import {
  librarianLend,
  librarianFine,
  librarianReturned,
} from "../controllers/libraryPerms.js";

const libRouter = express.Router();

libRouter.post("/librarian-lend", librarianAuth, librarianLend);
libRouter.post("/librarian-fine", librarianAuth, librarianFine);
libRouter.post("/librarian-returned", librarianAuth, librarianReturned);

export default libRouter;
