const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getProfile,
  updateProfile
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");

// AUTH ROUTES
router.post("/register", registerUser);
router.post("/login", loginUser);

// PROFILE ROUTES
router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateProfile);

module.exports = router;