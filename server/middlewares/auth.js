import jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/utility.js";

const isAuthenticated = (req, res, next) => {
  const token = req.cookies["Chatter-token"];
  if (!token) {
    return next(new ErrorHandler("Login first to access this route", 401));
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = decodedData._id;
  next();
};

export { isAuthenticated };
