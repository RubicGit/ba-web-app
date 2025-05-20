import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
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
        message: "Not Authorized. Log in again.",
      });
    }

    req.userId = decodedToken.id;
    next();
  } catch (error) {
    return res.json({ success: false, message: "Invalid token." });
  }
};

export default userAuth;
