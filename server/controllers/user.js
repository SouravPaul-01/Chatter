import { compare } from "bcrypt";
import { User } from "../models/user.js";
import { sendToken } from "../utils/features.js";
import { TryCatch } from "../middlewares/error.js";
import { ErrorHandler } from "../utils/utility.js";

const newUser = async (req, res) => {
  const { name, username, password, bio } = req.body;
  console.log(req.body);
  const avatar = {
    public_id: "id12",
    url: "https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png",
  };
  const user = await User.create({
    name,
    bio,
    username,
    password,
    avatar,
  });
  sendToken(res, user, 201, "User created successfully");
};

// login user and send token in cookie
const login = TryCatch(async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username }).select("+password");
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  const isMatch = await compare(password, user.password);
  if (!isMatch) {
    return next(new ErrorHandler("Invalid Password", 400));
  }
  sendToken(res, user, 200, `Logged In Successfully, Welcome ${user.name}`);
});
const getMyProfile = async (req, res) => {
  res.status(200).json({ success: true, user: "req.user1" });
};

export { login, newUser, getMyProfile };
