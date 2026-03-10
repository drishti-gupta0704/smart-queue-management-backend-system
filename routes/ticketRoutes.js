
const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");

const protect = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/roleMiddleware");
const {
  joinQueue,
  getPosition,
  cancelTicket,
  getAllTickets,
  getMyTickets
} = require("../controllers/ticketController");

// JOIN QUEUE
router.post(
  "/join",
  protect,
  body("queueId", "Queue ID is required").notEmpty(),
  joinQueue
);

// GET QUEUE POSITION
router.get(
  "/position/:queueId",
  protect,
  param("queueId", "Queue ID is required").notEmpty(),
  getPosition
);

// CANCEL TICKET
router.delete(
  "/cancel/:ticketId",
  protect,
  param("ticketId", "Ticket ID is required").notEmpty(),
  cancelTicket
);

// USER: Get my tickets
router.get("/my-tickets", protect, getMyTickets);

// ADMIN: Get all tickets
router.get("/all", protect, isAdmin, getAllTickets);

module.exports = router;