// packages
import mongoose from "mongoose";

const borrowedBooksSchema = new mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  bookTitle: { type: String, required: true },
  borrowedDate: { type: Date, required: true, default: Date.now },
  returnDate: { type: Date },
  fine: { type: Number, default: 0 },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  approved: {
    type: Boolean,
    default: false,
  },
});

const borrowedBooksModel =
  mongoose.model.borrowedBooks ||
  mongoose.model("borrowed-books", borrowedBooksSchema);

export default borrowedBooksModel;
