
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

// JOIN QUEUE
router.post("/join", protect, joinQueueValidation, joinQueue);

// GET QUEUE POSITION
router.get("/position/:queueId", protect, getPosition);

// CANCEL TICKET
router.delete("/cancel/:ticketId", protect, cancelTicket);

// USER: Get my tickets
router.get("/my-tickets", protect, getMyTickets);

// ADMIN: Get all tickets
router.get("/all", protect, isAdmin, getAllTickets);

// ADMIN: Update ticket status
router.patch(
  "/:ticketId/status",
  protect,
  isAdmin,
  updateTicketStatusValidation,
  updateTicketStatus
);

module.exports = router;