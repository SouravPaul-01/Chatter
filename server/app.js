import express from "express";
import { connectDB } from "./utils/features.js";
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import { createServer } from "http";
import { v4 as uuid } from "uuid";
import cors from "cors";

import userRoute from "./routes/user.js";
import chatRoute from "./routes/chat.js";
import adminRoute from "./routes/admin.js";
import { NEW_MESSAGE, NEW_MESSAGE_ALERT } from "./constants/event.js";
import { getSockets } from "./lib/helper.js";
import { Message } from "./models/message.js";
// import { createMessageInAChat } from "./seeders/chat.js";
// import { createUser } from "./seeders/user.js";
// import { createSingleChats, createGroupChats } from './seeders/chat.js';

dotenv.config({
  path: "./.env",
});

const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 3000;
const envMode = process.env.NODE_ENV.trim() || "PRODUCTION";
const adminSecretKey = process.env.ADMIN_SECRET_KEY || "ADMIN_SECRET_KEY";
const userSocketIDs = new Map();

connectDB(mongoURI);

// create fake user
// createUser(10);
// createSingleChats(10);
// createGroupChats(10);
// createMessageInAChat("68221dd731c2bb44cd6dca36", 50);

const app = express();
const server = createServer(app);
const io = new Server(server, {});

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:4173",
      process.env.CLIENT_URL,
    ],
    credentials: true,
  })
);

app.use("/api/v1/user", userRoute);
app.use("/api/v1/chat", chatRoute);
app.use("/api/v1/admin", adminRoute);

app.get("/", (req, res) => {
  res.send("hello world12");
});

// io.use((socket, next) => {});

io.on("connection", (socket) => {
  const user = { _id: "SocketID", name: "SocketName" };
  userSocketIDs.set(user._id.toString(), socket.id);

  console.log(userSocketIDs);

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
    console.log("new message:", messageForRealTime);

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
      console.log(err);
    }

    socket.on("disconnect", () => {
      console.log("user disconnected");
      userSocketIDs.delete(user._id.toString());
    });
  });
});

// error middleware
app.use(errorMiddleware);
server.listen(port, () => {
  console.log(`server is running on port ${port} in ${envMode} MODE`);
});

export { envMode, adminSecretKey, userSocketIDs };
