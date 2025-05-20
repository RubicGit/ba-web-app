// packages
import mongoose from "mongoose";

// files
import borrowedBooksSchema from "./borrowedBooksModel.js";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    baseRole: {
      type: String,
      enum: ["teacher", "student"],
      default: "user",
      required: true,
    },
    permRole: {
      type: [
        {
          type: String,
          enum: ["librarian", "event-manager", "teacher", "admin", "developer"],
        },
      ],
      default: [],
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  verifyOTP: {
    type: String,
    default: "",
  },
  verifyOTPExpiresAt: {
    type: String,
    default: "",
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  resetOTP: {
    type: String,
    default: "",
  },
  resetOTPExpiresAt: {
    type: String,
    default: "",
  },
  blackList: {
    type: Boolean,
    default: false,
  },
  borrowedBooks: [borrowedBooksSchema],
  class: {
    type: String,
    enum: [
      "9A",
      "9B",
      "9C",
      "9D",
      "9E",
      "9F",
      "10A",
      "10B",
      "10C",
      "10D",
      "10E",
      "11A",
      "11B",
      "11C",
      "11D",
      "11E",
      "12A",
      "12B",
      "12C",
      "12D",
      "12E",
    ],
  },
  classes: {
    type: String,
    enum: [
      "9A",
      "9B",
      "9C",
      "9D",
      "9E",
      "9F",
      "10A",
      "10B",
      "10C",
      "10D",
      "10E",
      "11A",
      "11B",
      "11C",
      "11D",
      "11E",
      "12A",
      "12B",
      "12C",
      "12D",
      "12E",
    ],
  },
});

const userModel = mongoose.model.user || mongoose.model("user", userSchema);

export default userModel;
