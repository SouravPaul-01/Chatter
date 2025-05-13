import jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/utility.js";
import { adminSecretKey } from "../app.js";
import { TryCatch } from "./error.js";

const isAuthenticated = (req, res, next) => {
  const token = req.cookies["Chatter-token"];
  if (!token) {
    return next(new ErrorHandler("Login first to access this route", 401));
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = decodedData._id;
  next();
};

const adminOnly = TryCatch((req, res, next) => {
  const token = req.cookies["Chatter-admin-token"];
  if (!token) {
    return next(
      new ErrorHandler(
        "Login as 'Admin' through Admin authentication to access this route",
        401
      )
    );
    const secretKey = jwt.verify(token, process.env.JWT_SECRET);

    const isMatched = secretKey === adminSecretKey;
    if (!isMatched) {
      return next(new ErrorHandler("Invalid Secret Key", 401));
    }
  }
  next();
});

export { isAuthenticated, adminOnly };
