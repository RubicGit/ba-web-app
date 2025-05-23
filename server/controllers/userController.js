// packages
import jwt from "jsonwebtoken";

// files
import userModel from "../models/userModel.js";
import borrowedBooksModel from "../models/borrowedBooksModel.js";
import bookModel from "../models/booksModel.js";
import homeworkModel from "../models/homeworkModel.js";
import eventModel from "../models/eventModel.js";
import classModel from "../models/classModel.js";

// user data fetch

export const getUserData = async (req, res) => {
  const userId = req.userId;
  const baseRole = req.baseRole;
  const permRole = req.permRole;

  try {
    const user = await userModel.findById(userId);
    let data = {};

    // base role data
    if (baseRole === "student") {
      data.homework = await homeworkModel.find({ class: user.class });
      data.homeworkPersonal = await homeworkModel.find({ userId: userId });
      data.books = await bookModel.find({ display: true });
      data.events = await eventModel.find({ global: true });
      data.eventsPersonal = await eventModel.find({ userId: userId });
    }

    if (baseRole === "teacher") {
      data.classes = await classModel.find({});
      data.books = await bookModel.find({ display: true });
      data.events = await eventModel.find({ global: true });
      data.eventsPersonal = await eventModel.find({ userId: userId });
    }

    // extra libraian data overrides books and adds borrowed books
    if (permRole.includes("librarian")) {
      data.borrowed = await borrowedBooksModel.find({});
      data.books = await bookModel.find({});
    }

    // extra event manager data removes the global filter
    if (permRole.includes("event-manager")) {
      data.events = await eventModel.find({});
    }

    // extra teacher data allows for selected homework data
    if (permRole.includes("teacher")) {
      data.homework = await homeworkModel.find({ userId: userId });
    }

    return res.status(200).json({
      success: true,
      message: "Successfully fetched data",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
