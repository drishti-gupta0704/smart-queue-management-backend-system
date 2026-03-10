
const { body } = require("express-validator");

const registerValidation = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters"),
  body("email")
    .isEmail()
    .withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
];

const loginValidation = [
  body("email")
    .isEmail()
    .withMessage("Valid email is required"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
];

module.exports = {
  registerValidation,
  loginValidation
};