import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const cookieOptions = {
  maxAge: 15 * 24 * 60 * 60 * 1000,
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
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  return res
    .status(statusCode)
    .cookie("Chatter-token", token, cookieOptions)
    .json({
      success: true,
      message,
    });
};
const emitEvent = (req, event, users, data) => {
  // users.forEach((user) => {
  //   req.io.to(user.socketId).emit(event, data);
  // });
  console.log("Emit event:", event);
};
const deleteFilesFromCloudinary = async (public_ids) => {};

export {
  connectDB,
  sendToken,
  cookieOptions,
  emitEvent,
  deleteFilesFromCloudinary,
};
