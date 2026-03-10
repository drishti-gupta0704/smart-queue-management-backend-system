
const express = require("express");
const router = express.Router();

const {
  joinQueue,
  getPosition,
  cancelTicket
} = require("../controllers/ticketController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/join", authMiddleware, joinQueue);

router.get("/position/:queueId", authMiddleware, getPosition);

router.delete("/cancel/:ticketId", authMiddleware, cancelTicket);

module.exports = router;