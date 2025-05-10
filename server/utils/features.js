import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const cookieOption = {
  maxAge: 30 * 24 * 60 * 60 * 1000,
  sameSite: "none",
  httpOnly: true,
  secure: true,
};
const connectDB = (uri) => {
  mongoose
    .connect(uri, { dbName: "Chatter" })
    .then((data) => {
      console.log(`DB connected:${data.connection.host}`);
    })
    .catch((err) => {
      throw err;
    });
};

const sendToken = (res, user, statusCode, message) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  return res
    .status(statusCode)
    .cookie("Chatter-token", token, cookieOption)
    .json({
      success: true,
      message,
    });
};

export { connectDB, sendToken };
