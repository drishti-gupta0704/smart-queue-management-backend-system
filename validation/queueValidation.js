
const { body } = require("express-validator");

const createQueueValidation = [
  body("name")
    .notEmpty()
    .withMessage("Queue name is required"),
  body("location")
    .notEmpty()
    .withMessage("Location is required"),
  body("maxSize")
    .optional()
    .isInt({ min: 1 })
    .withMessage("maxSize must be a positive integer")
];

module.exports = {
  createQueueValidation
};