import express from "express";
import { getMyProfile, login, newUser } from "../controllers/user.js";
import { singleAvatar } from "../middlewares/multer.js";
import { isAuthenticated } from "../middlewares/auth.js";

const app = express.Router();

// route for user management
app.post("/new", singleAvatar, newUser);
app.post("/login", login);

// route for logged in user only
app.get("/me", isAuthenticated, getMyProfile);

export default app;
