
const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/roleMiddleware");

const {
  createQueue,
  getQueues
} = require("../controllers/queueController");

router.post("/", protect, isAdmin, createQueue);

router.get("/", protect, getQueues);

module.exports = router;