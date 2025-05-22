import bookModel from "../models/booksModel.js";
import borrowedBooksModel from "../models/borrowedBooksModel.js";

export const librarianLend = async (req, res) => {
  const { bookId, returnDate } = req.body;
  const userId = req.userId;

  if (!bookId || !userId || !returnDate) {
    return res.json({
      success: false,
      message: "Missing Details",
    });
  }

  try {
    const book = await bookModel.findById(bookId);

    if (!book) {
      return res.json({
        success: false,
        message: "Book not found",
      });
    }

    if (book.available <= 0) {
      return res.json({
        success: false,
        message: "Book is currently unavailable",
      });
    }

    await borrowedBooksModel.create({
      bookId,
      bookTitle: book.title,
      borrowedDate: new Date(),
      returnDate,
      userId,
      approved: true,
    });

    book.available--;
    book.borrowed++;

    await book.save();

    return res.json({
      success: true,
      message: "Book successfully lent",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const userBorrow = async (req, res) => {
  const { bookId, returnDate } = req.body;
  const userId = req.userId;

  if (!bookId || !userId || !returnDate) {
    return res.json({
      success: false,
      message: "Missing Details",
    });
  }

  try {
    const book = await bookModel.findById(bookId);

    if (!book) {
      return res.json({
        success: false,
        message: "Book not found",
      });
    }

    if (book.available <= 0) {
      return res.json({
        success: false,
        message: "Book is currently unavailable",
      });
    }

    await BorrowedBook.create({
      bookId,
      bookTitle: book.title,
      borrowedDate: new Date(),
      returnDate,
      userId,
      approved: false,
    });

    book.available--;
    book.borrowed++;

    await book.save();

    return res.json({
      success: true,
      message: "Book successfully borrowed",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const approveBorrow = async (req, res) => {
  const { borrowedBookId } = req.body;

  if (!borrowedBookId) {
    return res.json({
      success: false,
      message: "Missing details",
    });
  }

  try {
    const borrowedBook = await borrowedBooksModel.findById(borrowedBookId);

    if (!borrowedBook) {
      return res.json({ success: false, message: "Borrowed book not found" });
    }

    borrowedBook.approved = true;

    await borrowedBook.save();

    res.json({
      success: true,
      message: "Borrow successfully approved",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const librarianFine = async (req, res) => {
  const { fine, borrowedBookId } = req.body;

  if (!fine || !borrowedBookId) {
    return res.json({ success: false, message: "Missing Details" });
  }

  try {
    const borrowedBook = await borrowedBooksModel.findById(borrowedBookId);

    if (!borrowedBook) {
      return res.json({
        success: false,
        message: "Borrowed book not Found",
      });
    }

    borrowedBook.fine = (borrowedBook.fine || 0) + fine;
    await borrowedBook.save();

    return res.json({
      success: true,
      message: "Fine successfully added",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const librarianReturned = async (req, res) => {
  const { borrowedBookId } = req.body;

  if (!borrowedBookId) {
    return res.json({ success: false, message: "Missing Details" });
  }

  try {
    const borrowedBook = await borrowedBooksModel.findById(borrowedBookId);
    const book = await bookModel.findById(borrowedBook.bookId);
    const user = await userModel.findById(borrowedBook.userId);

    if (!borrowedBook) {
      return res.json({
        success: false,
        message: "Borrowed book not Found",
      });
    }

    if (!book) {
      return res.json({
        success: false,
        message: "Book not Found",
      });
    }

    if (!user) {
      return res.json({
        success: false,
        message: "User not Found",
      });
    }

    user.totalFines += borrowedBook.fine;
    book.available++;
    book.borrowed--;

    await borrowedBooksModel.findByIdAndDelete(borrowedBookId);
    await book.save();
    await user.save();

    return res.json({
      success: true,
      message: "Book successfully returned",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const addBook = async (req, res) => {
  const { title, author, ratings, coverUrl, total, summary, categories } =
    req.body;

  if (!title || !total) {
    return res.json({
      success: false,
      message: "Insufficient Details",
    });
  }

  try {
    const available = total;
    await bookModel.create({
      title: title,
      author: author,
      ratings: { count: ratings },
      coverUrl: coverUrl,
      total: total,
      available: available,
      borrowed: total - available,
      summary: summary,
      categories: categories,
    });

    return res.json({
      success: true,
      message: "Successfully added book",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const incrementTotal = async (req, res) => {
  const { bookId, incrementDirection } = req.body;

  if (!bookId) {
    return res.json({
      success: false,
      message: "Missing Details",
    });
  }

  try {
    const book = await bookModel.findById(bookId);

    if (incrementDirection === "plus") {
      book.total++;
    }
    if (incrementDirection === "minus" && book.total > 0) {
      book.total--;
    }

    await book.save();

    return res.json({
      success: true,
      message: "Successfully incremented total",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
