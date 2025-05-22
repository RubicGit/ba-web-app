// packages
import express from "express";

// files
import librarianAuth from "../middleware/LibrarianAuth.js";
import {
  librarianLend,
  librarianFine,
  librarianReturned,
  userBorrow,
  approveBorrow,
  addBook,
  incrementTotal,
} from "../controllers/libraryPerms.js";

const libRouter = express.Router();

libRouter.post("/librarian-lend", librarianAuth, librarianLend);
libRouter.post("/user-borrow", userBorrow);
libRouter.post("/approve-borrow", librarianAuth, approveBorrow);
libRouter.post("/librarian-fine", librarianAuth, librarianFine);
libRouter.post("/librarian-returned", librarianAuth, librarianReturned);
libRouter.post("/add-book", librarianAuth, addBook);
libRouter.post("/increment-total", librarianAuth, incrementTotal);

export default libRouter;
