import express from "express";
import { connectDB } from "./utils/features.js";
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import { createServer } from "http";
import { v4 as uuid } from "uuid";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";
import {
  CHAT_JOINED,
  CHAT_LEAVED,
  NEW_MESSAGE,
  NEW_MESSAGE_ALERT,
  ONLINE_USERS,
  START_TYPING,
  STOP_TYPING,
  NEW_DRAWING,
} from "./constants/event.js";
import { getSockets } from "./lib/helper.js";
import { Message } from "./models/message.js";
import { corsOptions } from "./constants/config.js";
import { socketAuthenticator } from "./middlewares/auth.js";
// import { createMessageInAChat } from "./seeders/chat.js";
// import { createUser } from "./seeders/user.js";
// import { createSingleChats, createGroupChats } from './seeders/chat.js';

import userRoute from "./routes/user.js";
import chatRoute from "./routes/chat.js";
import adminRoute from "./routes/admin.js";

dotenv.config({
  path: "./.env",
});

const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 3000;
const envMode = process.env.NODE_ENV.trim() || "PRODUCTION";
const adminSecretKey = process.env.ADMIN_SECRET_KEY || "ADMIN_SECRET_KEY";
const userSocketIDs = new Map();
const onlineUsers = new Set();

connectDB(mongoURI);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// create fake user
// createUser(10);
// createSingleChats(10);
// createGroupChats(10);
// createMessageInAChat("68221dd731c2bb44cd6dca36", 50);

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: corsOptions,
});

app.set("io", io);

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/user", userRoute);
app.use("/api/v1/chat", chatRoute);
app.use("/api/v1/admin", adminRoute);

app.get("/", (req, res) => {
  res.send("hello world12");
});

io.use((socket, next) => {
  cookieParser()(
    socket.request,
    socket.request.res,
    async (err) => await socketAuthenticator(err, socket, next)
  );
});

io.on("connection", (socket) => {
  const user = socket.user;
  userSocketIDs.set(user._id.toString(), socket.id);

  socket.on(NEW_MESSAGE, async ({ chatId, members, message }) => {
    const messageForRealTime = {
      content: message,
      _id: uuid(),
      sender: {
        _id: user._id,
        name: user.name,
      },
      chat: chatId,
      createdAt: new Date().toISOString(),
    };

    const messageForDB = {
      content: message,
      sender: user._id,
      chat: chatId,
    };

    const membersSocket = getSockets(members);
    io.to(membersSocket).emit(NEW_MESSAGE, {
      chatId,
      message: messageForRealTime,
    });
    io.to(membersSocket).emit(NEW_MESSAGE_ALERT, { chatId });

    try {
      await Message.create(messageForDB);
    } catch (err) {
      throw new Error(err);
    }
  });

  socket.on(NEW_DRAWING, async ({ chatId, members, drawing }) => {
    try {
      // Upload drawing to Cloudinary
      const uploadResult = await cloudinary.uploader.upload(drawing, {
        resource_type: "auto",
        public_id: `drawing_${uuid()}`,
      });

      if (
        !uploadResult ||
        !uploadResult.public_id ||
        !uploadResult.secure_url
      ) {
        console.error("Cloudinary upload failed:", uploadResult);
        // Optionally emit an error back to the client
        socket.emit("upload_error", { message: "Failed to upload drawing." });
        return;
      }

      const attachments = [
        {
          public_id: uploadResult.public_id,
          url: uploadResult.secure_url,
        },
      ];

      const messageForRealTime = {
        content: "Drawing",
        _id: uuid(),
        sender: {
          _id: user._id,
          name: user.name,
        },
        chat: chatId,
        createdAt: new Date().toISOString(),
        attachments: attachments,
      };

      const messageForDB = {
        content: "Drawing",
        sender: user._id,
        chat: chatId,
        attachments: attachments,
      };

      const membersSocket = getSockets(members);
      io.to(membersSocket).emit(NEW_MESSAGE, {
        chatId,
        message: messageForRealTime,
      });
      io.to(membersSocket).emit(NEW_MESSAGE_ALERT, { chatId });

      await Message.create(messageForDB);
    } catch (err) {
      console.error("Error handling NEW_DRAWING event:", err);
      // Optionally emit an error back to the client
      socket.emit("server_error", {
        message: "An error occurred while processing your drawing.",
      });
      // Depending on error handling strategy, you might still want to throw or just log
      // throw new Error(err);
    }
  });

  socket.on(START_TYPING, ({ members, chatId }) => {
    const membersSockets = getSockets(members);
    socket.to(membersSockets).emit(START_TYPING, { chatId });
  });
  socket.on(STOP_TYPING, ({ members, chatId }) => {
    const membersSockets = getSockets(members);
    socket.to(membersSockets).emit(STOP_TYPING, { chatId });
  });

  socket.on(CHAT_JOINED, ({ userId, members }) => {
    onlineUsers.add(userId.toString());
    const membersSockets = getSockets(members);
    io.to(membersSockets).emit(ONLINE_USERS, Array.from(onlineUsers));
  });

  socket.on(CHAT_LEAVED, ({ userId, members }) => {
    onlineUsers.delete(userId.toString());
    const membersSockets = getSockets(members);
    io.to(membersSockets).emit(ONLINE_USERS, Array.from(onlineUsers));
  });

  socket.on("disconnect", () => {
    userSocketIDs.delete(user._id.toString());
    onlineUsers.delete(user._id.toString());
    socket.broadcast.emit(ONLINE_USERS, Array.from(onlineUsers));
  });
});

// error middleware
app.use(errorMiddleware);
server.listen(port, () => {
  console.log(`server is running on port ${port} in ${envMode} MODE`);
});

export { envMode, adminSecretKey, userSocketIDs };
