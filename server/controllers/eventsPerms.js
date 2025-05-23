// files
import eventModel from "../models/eventsModel.js";
import userModel from "../models/userModel.js";

export const addEvent = async (req, res) => {
  const { title, date, ethDate, coverUrl, description } = req.body;
  const userId = req.userId;

  const user = await userModel.findById(userId);

  if (!title || !date || !ethDate || !description) {
    return res.json({
      success: false,
      messsage: "Insufficient details",
    });
  }

  const finalCoverUrl =
    coverUrl && user.permRole.includes("event-manager") ? coverUrl : "";

  // if (user.permRole.includes("event-manager")) {
  //   global = true;
  // }

  try {
    await eventModel.create({
      title,
      date,
      ethDate,
      coverUrl: finalCoverUrl,
      description,
      global: false,
    });

    return res.status(200).json({
      success: true,
      message: "Event added",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const removeEvent = async (req, res) => {
  const { eventId } = req.body;
  const userId = req.userId;

  if (!eventId) {
    return res.status(400).json({
      success: false,
      message: "Insufficient details",
    });
  }

  const user = await userModel.findById(userId);
  const event = await eventModel.findById(eventId);

  if (!event) {
    return res.status(400).json({
      success: false,
      message: "Event not found",
    });
  }

  if (event.global === true && !user.permRole.includes("event-manager")) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized to delete",
    });
  }

  if (event.userId.toString() !== userId) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized to delete",
    });
  }

  try {
    await eventModel.findByIdAndDelete(eventId);

    return res.status(200).json({
      success: true,
      message: "Event removed",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const editEvent = async (req, res) => {
  const { eventId, title, date, ethDate, coverUrl, description } = req.body;
  const userId = req.userId;

  if (!title && !date && !ethDate && !description) {
    return res.json({
      success: false,
      message: "No details provided",
    });
  }

  try {
    const user = await userModel.findById(userId);
    const event = await eventModel.findById(eventId);

    if (!event) {
      return res.status(400).json({
        success: false,
        message: "Event not found",
      });
    }

    const finalCoverUrl =
      coverUrl && user.permRole.includes("event-manager")
        ? coverUrl
        : event.coverUrl;

    if (title) event.title = title;
    if (date) event.date = date;
    if (ethDate) event.ethDate = ethDate;
    if (description) event.description = description;
    event.coverUrl = finalCoverUrl;

    await event.save();

    return res.status(200).json({
      success: true,
      message: "Event edited",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const toggleGlobal = async (req, res) => {
  const { eventId } = req.body;
  const userId = req.userId;

  if (!eventId) {
    return res.status(400).json({
      success: false,
      message: "Insufficient details",
    });
  }

  const user = await userModel.findById(userId);
  const event = await eventModel.findById(eventId);

  if (!event) {
    return res.status(400).json({
      success: false,
      message: "Event not found",
    });
  }

  try {
    if (!user.permRole.includes("event-manager")) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }
    event.global = !event.global;
    await event.save();

    return res.status(200).json({
      success: true,
      message: "Event globalized",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
