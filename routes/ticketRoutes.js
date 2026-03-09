
const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const { joinQueue } = require("../controllers/ticketController");

router.post("/join", protect, joinQueue);

module.exports = router;