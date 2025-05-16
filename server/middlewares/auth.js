import jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/utility.js";
import { adminSecretKey } from "../app.js";
import { TryCatch } from "./error.js";
import { CHATTER_TOKEN } from "../constants/config.js";
import { User } from "../models/user.js";

const isAuthenticated = (req, res, next) => {
  const token = req.cookies[CHATTER_TOKEN];
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

const socketAuthenticator = async (err, socket, next) => {
  try {
    if (err) return next(err);

    const authToken = socket.request.cookies[CHATTER_TOKEN];

    if (!authToken)
      return next(new ErrorHandler("Login first to access this route", 401));

    const decodedData = jwt.verify(authToken, process.env.JWT_SECRET);

    const user = await User.findById(decodedData._id);

    if (!user) return next(new ErrorHandler("User not found", 404));

    socket.user = user;

    return next();
  } catch (error) {
    return next(new ErrorHandler("Login first to access this route", 401));
  }
};

export { isAuthenticated, adminOnly, socketAuthenticator };
