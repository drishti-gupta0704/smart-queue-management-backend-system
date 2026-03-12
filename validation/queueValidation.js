
const { body, validationResult } = require("express-validator");

const createQueueValidation = [
  body("name").notEmpty().withMessage("Queue name is required"),
  body("location").notEmpty().withMessage("Location is required"),
  body("maxSize")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Max size must be a positive integer"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = {
  createQueueValidation
};