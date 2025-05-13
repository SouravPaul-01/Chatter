import { body, param, validationResult } from "express-validator";
import { ErrorHandler } from "../utils/utility.js";

const validateHandler = (req, res, next) => {
  const errors = validationResult(req);

  const errorMessages = errors
    .array()
    .map((error) => error.msg)
    .join(", ");

  console.log(errorMessages);

  if (errors.isEmpty()) return next();
  else next(new ErrorHandler(errorMessages, 400));
};

const registerValidator = () => [
  body("name", "Name is required").notEmpty(),
  body("username", "Username is required").notEmpty(),
  body("password", "Password is required").notEmpty(),
  body("bio", "Bio is required").notEmpty(),
];
const loginValidator = () => [
  body("username", "Username is required").notEmpty(),
  body("password", "Password is required").notEmpty(),
];

const newGroupValidator = () => [
  body("name", "Name is required").notEmpty(),
  body("members")
    .notEmpty()
    .withMessage("Members are required")
    .isArray({ min: 2, max: 100 })
    .withMessage(
      "At least 2 members are required and maximum 100 members are allowed"
    ),
];

const addMemberValidator = () => [
  body("chatId", "Chat Id is required").notEmpty(),
  body("members")
    .notEmpty()
    .withMessage("Members are required")
    .isArray({ min: 1, max: 100 })
    .withMessage(
      "At least 1 members are required and maximum 100 members are allowed"
    ),
];

const removeMemberValidator = () => [
  body("chatId", "Chat Id is required").notEmpty(),
  body("userId", "User Id is required").notEmpty(),
];

const sendAttachmentsValidator = () => [
  body("chatId", "Chat Id is required").notEmpty(),
];

const chatIdValidator = () => [param("id", "Chat Id is required").notEmpty()];

const renameValidator = () => [
  param("id", "Chat Id is required").notEmpty(),
  body("name", "Name is required").notEmpty(),
];

const sendRequestValidator = () => [
  body("userId", "User Id is required").notEmpty(),
];

const acceptRequestValidator = () => [
  body("requestId", "Request Id is required").notEmpty(),
  body("accept")
    .notEmpty()
    .withMessage("Accept is required")
    .isBoolean()
    .withMessage("Accept must be boolean"),
];

const adminLoginValidator = () => [
  body("secretKey", "Secret Key is required").notEmpty(),
];
export {
  acceptRequestValidator,
  addMemberValidator,
  adminLoginValidator,
  chatIdValidator,
  loginValidator,
  newGroupValidator,
  registerValidator,
  removeMemberValidator,
  renameValidator,
  sendAttachmentsValidator,
  sendRequestValidator,
  validateHandler,
};
