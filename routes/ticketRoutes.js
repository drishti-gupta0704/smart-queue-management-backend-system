
const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/roleMiddleware");

const {
  joinQueue,
  getPosition,
  cancelTicket,
  getAllTickets,
  getMyTickets,
  updateTicketStatus
} = require("../controllers/ticketController");

const {
  joinQueueValidation,
  updateTicketStatusValidation
} = require("../validation/ticketValidation");

// USER ROUTES

// Join a queue
router.post("/join", protect, joinQueueValidation, joinQueue);

// Get my position in a queue
router.get("/position/:queueId", protect, getPosition);

// Cancel my ticket
router.delete("/cancel/:ticketId", protect, cancelTicket);

// Get all tickets of logged-in user
router.get("/my-tickets", protect, getMyTickets);

// ADMIN ROUTES

// Get all tickets in the system
router.get("/all", protect, isAdmin, getAllTickets);

// Update ticket status (serving, completed, cancelled)
router.patch(
  "/:ticketId/status",
  protect,
  isAdmin,
  updateTicketStatusValidation,
  updateTicketStatus
);

module.exports = router;