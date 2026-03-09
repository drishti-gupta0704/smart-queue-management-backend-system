
const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/roleMiddleware");

const { getProfile } = require("../controllers/userController");

// logged in user profile
router.get("/profile", protect, getProfile);

// admin route
router.get("/admin", protect, isAdmin, (req, res) => {
  res.json({ message: "Welcome Admin" });
});

module.exports = router;