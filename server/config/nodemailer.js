// config/nodemailer.js
import nodemailer from "nodemailer";

// Dev-only transporter that logs email instead of sending
const transporter = nodemailer.createTransport({
  streamTransport: true,
  newline: "unix",
  buffer: true,
});

export default transporter;
