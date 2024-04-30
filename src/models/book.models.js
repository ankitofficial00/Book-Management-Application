import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    genre: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      unique: true,
    },
    author: {
      type: String,
      index: true, // it is generally used for filtering the books optimist
    },
    publicationYear: {
      type: Number,
      index: true, // it is generally used for filtering the books optimist
    },
  },
  { timestamps: true }
);

export const Book = mongoose.model("Book", bookSchema);
