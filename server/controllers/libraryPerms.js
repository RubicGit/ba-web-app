export const librarianLend = async (req, res) => {
  const userId = req.userId;

  // get the data from the req.body

  // use data to create borrowedBook doc

  // bind the borrowedBook doc to the student and book
};

export const librarianFine = async (req, res) => {
  const { fine, bookId } = req.body;

  // get the borrowed book object with bookId

  // set the fine to the number in the req.body
};

export const librarianReturned = async (req, res) => {
  const userId = req.userId;

  // get the userId, borrowedBookId and bookId

  // get the data from ids and store them in variables

  // delete borrowedBook doc

  // add one to available boooks of that book

  // subtract one from the borrowed books of that books
};
