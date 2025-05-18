import { envMode } from "../app.js";

const errorMiddleware = (err, req, res, next) => {
  err.message ||= "Internal Server Error";
  err.statusCode ||= 500;

  // Handle Duplicate Key Error
  if (err.code === 11000) {
    const errorField = Object.keys(err.keyPattern).join(" ");
    err.message = `Duplicate ${errorField} found`;
    err.statusCode = 400;
  }
  //CastError Handler - Mongoose
  if (err.name === "CastError") {
    const errorPath = err.path;
    err.message = `Invalid format in ${errorPath}`;
    err.statusCode = 400;
  }
  const response = {
    success: false,
    message: err.message,
  };
  if (envMode === "DEVELOPMENT") {
    response.error = err;
  }

  return res.status(err.statusCode).json(response);
};

// error handler With TryCatch
const TryCatch = (passedFunction) => async (req, res, next) => {
  try {
    await passedFunction(req, res, next);
  } catch (err) {
    next(err);
  }
};
export { errorMiddleware, TryCatch };
