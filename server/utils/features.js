import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import { v4 as uuid } from "uuid";
import { getBase64, getSockets } from "../lib/helper.js";

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
      user: {
        _id: user._id,
        name: user.name,
        username: user.username,
        bio: user.bio,
        avatar: user.avatar,
        createdAt: user.createdAt,
      },
    });
};
const emitEvent = (req, event, users, data) => {
  const io = req.app.get("io");
  const usersSocket = getSockets(users);
  io.to(usersSocket).emit(event, data);
};
// const uploadFilesToCloudinary = async (files = []) => {
//   const uploadPromises = files.map((file) => {
//     return new Promise((resolve, reject) => {
//       cloudinary.uploader.upload(
//         getBase64(file),
//         {
//           resource_type: "auto",
//           public_id: uuid(),
//         },
//         (error, result) => {
//           if (error) {
//             return reject(error);
//           }
//           return resolve(result);
//         }
//       );
//     });
//   });
//   try {
//     const results = await Promise.all(uploadPromises);
//     const formattedResults = results.map((result) => ({
//       public_id: result.public_id,
//       url: result.secure_url,
//     }));
//     return formattedResults;
//   } catch (error) {
//     console.error("Cloudinary upload error:", error);
//     // throw error;

//     throw new Error("Error uploading files to Cloudinary", error);
//   }
// };

// const uploadFilesToCloudinary = async (files = []) => {
//   const uploadPromises = files.map((file) => {
//     return new Promise((resolve, reject) => {
//       cloudinary.uploader.upload(
//         getBase64(file),
//         {
//           resource_type: "auto",
//           public_id: uuid(),
//         },
//         (error, result) => {
//           if (error) return reject(error);
//           resolve(result);
//         }
//       );
//     });
//   });

const uploadFilesToCloudinary = async (files = []) => {
  if (!files || files.length === 0) {
    throw new Error("No files provided for upload");
  }

  const uploadPromises = files.map((file) => {
    return new Promise((resolve, reject) => {
      if (!file.buffer) {
        return reject(new Error("Invalid file format"));
      }

      cloudinary.uploader.upload(
        getBase64(file),
        {
          resource_type: "auto",
          public_id: uuid(),
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            return reject(new Error(`Failed to upload file: ${error.message}`));
          }
          resolve(result);
        }
      );
    });
  });

  try {
    const results = await Promise.all(uploadPromises);
    const formattedResults = results.map((result) => ({
      public_id: result.public_id,
      url: result.secure_url,
    }));
    return formattedResults;
  } catch (err) {
    console.error("Error in uploadFilesToCloudinary:", err);
    throw new Error(`Failed to upload files: ${err.message}`);
  }
};

const deleteFilesFromCloudinary = async (public_ids) => {};

export {
  connectDB,
  sendToken,
  cookieOptions,
  emitEvent,
  uploadFilesToCloudinary,
  deleteFilesFromCloudinary,
};
