export const autosaveDraft = async (req, res) => {
  const userId = req.userId;

  // takes input field data and saves it in the answer

  // only calls when drawer is closed
};

export const checkPending = async (req, res) => {
  const userId = req.userId;

  // checks if answer has been updates

  // checks if answer is empty

  // if answer isn't empty, sets status to pending
};

export const submitHomework = async (req, res) => {
  const userId = req.userId;

  // sets isSubmitted to true

  // sets status to completed

  // only called when button is pressed
};

export const setNotStarted = async (req, res) => {
  const userId = req.userId;

  // checks if this is personal hw

  // sets status to not started
};

export const setPending = async (req, res) => {
  const userId = req.userId;

  // checks if this is personal hw

  // sets status to pending
};

export const setCompleted = async (req, res) => {
  const userId = req.userId;

  // checks if this is personal hw

  // sets status to completed

  // teachers can't see because this is student hw
};

export const renderHomework = async (req, resetOTP) => {
  const userId = req.userId;

  // checks baseRole

  // if teacher, get userId and get the teacher's hw

  // if student, get userId and get the student's hw
  // and class hw
};

export const markHomework = async (req, res) => {
  const userId = req.userId;

  // gets the mark number and homeworkId

  // sets the mark number in the homework doc
  // to the input

  // sets isMarked as true

  // needs homeworkAuth on it
};
