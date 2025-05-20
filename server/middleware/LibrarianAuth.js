// packages
import jwt from "jsonwebtoken";

const librarianAuth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.json({
      success: false,
      message: "Not Authorized. Log in again.",
    });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedToken.id) {
      return res.json({
        success: false,
        message: "Not Authorized. Invalid Token.",
      });
    }

    if (decodedToken.signature !== "bird is the word") {
      return res.json({
        success: false,
        message: "Not Authorized. Invalid Token.",
      });
    }

    if (decodedToken.baseRole !== "teacher") {
      return res.json({ success: false, message: "Not a teacher" });
    }

    if (!decodedToken.permRole.includes("librarian")) {
      return res.json({ success: false, message: "Not a librarian" });
    }

    req.userId = decodedToken.id;
    req.baseRole = decodedToken.baseRole;
    req.permRole = decodedToken.permRole;
    next();
  } catch (error) {
    return res.json({ success: false, message: "Invalid token." });
  }
};

export default librarianAuth;
