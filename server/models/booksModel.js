// packages
import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String },
  rating: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 },
  },
  available: { type: Number },
  total: { type: Number },
  borrowed: { type: Number, default: 0 },
  genre: [{ type: String }],
  summary: { type: String },
  coverUrl: { type: String, required: true },
});

const bookModel = mongoose.model.book || mongoose.model("book", bookSchema);

export default bookModel;
