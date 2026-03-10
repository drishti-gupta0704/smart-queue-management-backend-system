
const { body, param } = require("express-validator");

const joinQueueValidation = [
  body("queueId")
    .notEmpty()
    .withMessage("Queue ID is required")
];

const cancelTicketValidation = [
  param("ticketId")
    .notEmpty()
    .withMessage("Ticket ID is required")
];

module.exports = {
  joinQueueValidation,
  cancelTicketValidation
};