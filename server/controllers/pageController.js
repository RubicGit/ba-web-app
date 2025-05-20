// packages
import jwt from "jsonwebtoken";

// files
import userModel from "../models/userModel.js";
import pageRoutes from "../constants/pageRoutes.json";

// librarian

export const librarianData = async (req, res) => {
  const userId = req.userId;
  const baseRole = req.baseRole;
  const permRole = req.permRole;

  // book data access
  /*
    books would have a display boolean value that
    displays all the books for the librrarian (false
    ones being red or grey) and just the ones with
    the true value for the students
  */

  // borrowed books data access
  /*
    all the borrowed books from the library, their
    due dates and strike numbers for students on
    another tab
  */

  // user data access
  /*
    all the users that will show up in the lend
    dialog and the borrowed books section will be
    imported from the user collection
  */

  // all stored in the context
};

// teacher

export const teacherData = async (req, res) => {
  const userId = req.userId;

  // student data access
  /*
    students data will be important to associate a
    homework to a student. the answers, results,
    everything of that specific homework will be bound
    to a user object that can be later used to populate
    class results and averages
  */

  // homework data access
  /*
    homework data is collected from the homeworks
    collection to compile the list of homeworks the
    teacher had assigned and to which class. This also
    includes student submissions. when clicked on the
    table element, a drawer from the side pops up and
    shows all of the submissions which further create
    dialog components themselves
  */
};

// event manager

export const eventManagerData = async (req, res) => {
  const userId = req.userId;

  // calendar events access
  /*
    all of the calendar events are visible and editable
    to the event manager. with the images, and what not.
  */
};

//  base roles

export const baseEventsData = async (req, res) => {
  const userId = req.userId;

  // calendar events access
  /*
    all of the calendar events are visible and editable
    to the event manager. with the images, and what not.
  */
};

export const baseLibraryData = async (req, res) => {
  const userId = req.userId;

  // book data access
  /*
    books would have a display boolean value that
    displays all the books for the librrarian (false
    ones being red or grey) and just the ones with
    the true value for the students
  */
};

// students

export const studentHomeworkData = async (req, res) => {
  const userId = req.userId;

  // homework data access
  /*
    students can access all the homework objects
    related to the class they're assigned
  */
};

// teachers

export const classListData = async (req, res) => {
  const userId = req.userId;

  // class list data access
  /*
    teachers can access the entire class list and
    the students inside each class as an overview
  */
};
