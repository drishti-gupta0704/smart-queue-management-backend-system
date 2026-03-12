
// routes/ticketRoutes.js
const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/roleMiddleware");

const {
  joinQueue,
  getPosition,
  cancelTicket,
  getMyTickets,
  getAllTickets,
  updateTicketStatus
} = require("../controllers/ticketController");

const {
  joinQueueValidation,
  updateTicketStatusValidation
} = require("../validation/ticketValidation");

// ---------------- USER ROUTES ----------------

// Join queue
router.post("/join", protect, joinQueueValidation, joinQueue);

// Check queue position
router.get("/position/:queueId", protect, getPosition);

// Cancel ticket
router.delete("/cancel/:ticketId", protect, cancelTicket);

// Get my tickets
router.get("/my-tickets", protect, getMyTickets);


// ---------------- ADMIN ROUTES ----------------

// Get all tickets in a queue
router.get("/all", protect, isAdmin, getAllTickets);

// Update ticket status
router.patch(
  "/:ticketId/status",
  protect,
  isAdmin,
  updateTicketStatusValidation,
  updateTicketStatus
);

module.exports = router;