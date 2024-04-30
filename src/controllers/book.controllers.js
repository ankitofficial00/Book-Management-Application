import { Book } from "../models/book.models.js";

//  CRUD OPERATIONS  FOR MANAGING THE BOOK ENTRIES

// ADD A BOOK
const addBook = async (req, res) => {
  try {
    // get the book data from the frontend and destructed  that to use that data
    const { genre, title, author, publicationYear } = req.body;

    // input validation
    if (!genre || !title || !author || !publicationYear) {
      return res
        .status(404)
        .json({ success: false, message: "provide the all  required fields" });
    }

    const book = await Book.create({
      genre,
      title,
      author,
      publicationYear,
    });

    if (!book) {
      return res.status(402).json({
        success: false,
        message: "something went wrong while adding a new book",
      });
    }

    return res
      .status(200)
      .json({ success: true, message: "new Book add successfully" });
  } catch (error) {
    console.log(error.message);
  }
};

const readAllBook = async (req, res) => {
  try {
    const books = await Book.find();
    if (!books) {
      return res
        .status(404)
        .json({ success: false, message: "Books does not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Books successfully fetched", books });
  } catch (error) {
    console.log(error.message);
  }
};

// filter books based on author or publication year

const filterBook = async (req, res) => {
  const { author, publicationYear } = req.query;
  console.log(req.query);
  try {
    let books;
    if (publicationYear) {
      books = await Book.find({ publicationYear });
      console.log(books);
    } else if (author) {
      books = await Book.find({ author: author });
      console.log(books);
    }

    if (!books) {
      return res
        .status(404)
        .json({ success: false, message: "Books does not found" });
    }
    console.log(books);
    return res
      .status(200)
      .json({ success: true, message: "Books successfully fetched", books });
  } catch (error) {
    console.log(error.message);
  }
};

// update the book details
const updateBook = async (req, res) => {
  const { genre, author, title, publicationYear } = req.body;
  try {
    // find the book by its id the update its details
    const updatedBook = await Book.findByIdAndUpdate(
      { _id: req.params.id },
      {
        publicationYear,
        genre,
        title,
        author,
      },
      {
        new: true,
      }
    );

    if (!updateBook) {
      return res
        .status(404)
        .json({ success: false, message: "no book found " });
    }
    console.log(updateBook);
    return res
      .status(200)
      .json({ success: true, message: "Books  details updated successfully" });
  } catch (error) {
    console.log(error.message);
  }
};

const deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);

    return res
      .status(202)
      .json({ success: true, message: "Book deleted successfully" });
  } catch (error) {
    console.log(error.message);
  }
};
export { addBook, readAllBook, filterBook, updateBook, deleteBook };
