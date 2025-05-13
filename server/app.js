import express from "express";
import { connectDB } from "./utils/features.js";
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";

import userRoute from "./routes/user.js";
import chatRoute from "./routes/chat.js";
import adminRoute from "./routes/admin.js";
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

connectDB(mongoURI);

// create fake user
// createUser(10);
// createSingleChats(10);
// createGroupChats(10);
// createMessageInAChat("68221dd731c2bb44cd6dca36", 50);

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use("/user", userRoute);
app.use("/chat", chatRoute);
app.use("/admin", adminRoute);

app.get("/", (req, res) => {
  res.send("hello world12");
});

// error middleware
app.use(errorMiddleware);
app.listen(port, () => {
  console.log(`server is running on port ${port} in ${envMode} MODE`);
});

export { envMode, adminSecretKey };
