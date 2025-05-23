import homeworkModel from "../models/homeworkModel";
import userModel from "../models/userModel";

export const autosaveDraft = async (req, res) => {
  const { homeworkId, answer } = req.body;

  if (!homeworkId) {
    return res.status(400).json({
      success: false,
      message: "Missing homework ID",
    });
  }

  const homework = await homeworkModel.findById(homeworkId);

  if (!homework) {
    return res
      .status(404)
      .json({ success: false, message: "Homework not found" });
  }

  if (homework.userId.toString() !== req.userId) {
    return res
      .status(403)
      .json({ success: false, message: "Not your homework" });
  }

  try {
    homework.answer = answer;
    await homework.save();

    return res.status(200).json({
      success: true,
      message: "Successfully drafted homework answer",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }

  // takes input field data and saves it in the answer

  // only calls when drawer is closed
};

export const checkPending = async (req, res) => {
  const { homeworkId } = req.body;

  if (!homeworkId) {
    return res.status(400).json({
      success: false,
      message: "Missing homework ID",
    });
  }

  const homework = await homeworkModel.findById(homeworkId);

  if (!homework) {
    return res
      .status(404)
      .json({ success: false, message: "Homework not found" });
  }

  try {
    if (homework.answer !== "" && homework.status === "not-started") {
      homework.status = "pending";
    } else if (homework.status !== "not-started") {
      homework.status = "not-started";
    }

    await homework.save();

    return res.status(200).json({
      success: true,
      message: "Successfully checked pending",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }

  // checks if answer has been updates

  // checks if answer is empty

  // if answer isn't empty, sets status to pending
};

export const submitHomework = async (req, res) => {
  const { homeworkId } = req.body;

  if (!homeworkId) {
    return res.status(400).json({
      success: false,
      message: "Missing homework ID",
    });
  }

  const homework = await homeworkModel.findById(homeworkId);

  if (!homework) {
    return res
      .status(404)
      .json({ success: false, message: "Homework not found" });
  }

  try {
    homework.isSubmitted = true;
    homework.status = "completed";

    await homework.save();

    return res.status(200).json({
      success: true,
      message: "Successfully checked pending",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
  // sets isSubmitted to true

  // sets status to completed

  // only called when button is pressed
};

export const updateHomeworkStatus = async (req, res) => {
  const { homeworkId, status } = req.body;

  if (!["not-started", "pending", "completed"].includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Invalid status",
    });
  }

  try {
    const homework = await homeworkModel.findById(homeworkId);

    if (!homework) {
      return res
        .status(404)
        .json({ success: false, message: "Homework not found" });
    }

    homework.status = status;
    await homework.save();

    res
      .status(200)
      .json({ success: true, message: `Status updated to ${status}` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const assignHomework = async (req, res) => {
  const { title, description, dueDate, maxMark, classId } = req.body;

  if (!title || !dueDate || !maxMark || !classId) {
    return res.status(400).json({
      success: false,
      message: "Insufficient details",
    });
  }

  try {
    const assignedDate = new Date();

    await homeworkModel.create({
      title: title,
      description: description,
      dueDate: dueDate,
      assignedDate: assignedDate,
      maxMark: maxMark,
      classId: classId,
    });

    return res.status(200).json({
      success: true,
      message: "Successfully assigned homework",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createHomework = async (req, res) => {
  const { title, description, dueDate, userId } = req.body;

  if (!title || !dueDate || !userId) {
    return res.status(400).json({
      success: false,
      message: "Insufficient details",
    });
  }

  try {
    const assignedDate = new Date();

    await homeworkModel.create({
      title: title,
      description: description,
      dueDate: dueDate,
      assignedDate: assignedDate,
      userId: userId,
    });

    return res.status(200).json({
      success: true,
      message: "Successfully created homework",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const markHomework = async (req, res) => {
  const { homeworkId, mark } = req.body;

  if (!homeworkId) {
    return res.status(400).json({
      success: false,
      message: "Missing homework ID",
    });
  }

  if (!mark) {
    return res.status(400).json({
      success: false,
      message: "Missing mark value",
    });
  }

  const homework = await homeworkModel.findById(homeworkId);

  if (!homework) {
    return res
      .status(404)
      .json({ success: false, message: "Homework not found" });
  }

  try {
    homework.mark = mark;
    homework.isMarked = true;

    await homework.save();

    return res.status(200).json({
      success: true,
      message: "Successfully set to completed",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }

  // gets the mark number and homeworkId

  // sets the mark number in the homework doc
  // to the input

  // sets isMarked as true

  // needs homeworkAuth on it
};
