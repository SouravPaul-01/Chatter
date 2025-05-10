import { TryCatch } from "./error.js";

const isAuthenticated = TryCatch(async (req, res, next) => {
  //   const token = req.cookies["Chatter-token"];
  console.log(req.cookies);
  next();
});

export { isAuthenticated };
