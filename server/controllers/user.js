import { User } from "../models/user.js";

const newUser = async (req, res) => {
  const { name, username, password, bio } = req.body;
  console.log(req.body);
  const avatar = {
    public_id: "id12",
    url: "https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png",
  };
  await User.create({
    name,
    bio,
    username,
    password,
    avatar,
  });
  res.status(201).json({ message: "success||User Created Successfully" });
};

const login = (req, res) => {
  res.send("hello world");
};

export { login, newUser };
