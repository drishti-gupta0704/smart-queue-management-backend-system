
const { body, param, validationResult } = require("express-validator");

// Join queue validation
const joinQueueValidation = [
  body("queueId").notEmpty().withMessage("Queue ID is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// Updating ticket status validation (admin)
const updateTicketStatusValidation = [
  param("ticketId").notEmpty().withMessage("Ticket ID is required"),
  body("status")
    .notEmpty()
    .withMessage("Status is required")
    .isIn(["waiting", "serving", "completed", "cancelled"])
    .withMessage("Invalid status value"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = {
  joinQueueValidation,
  updateTicketStatusValidation
};