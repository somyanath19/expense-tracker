const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const Transaction = require("../models/Transaction");

const {
  addTransaction,
  getTransactions,
  deleteTransaction,
} = require("../controllers/transactionController");

// ADD TRANSACTION
router.post("/", authMiddleware, addTransaction);

// GET ALL TRANSACTIONS
router.get("/", authMiddleware, getTransactions);

// DELETE TRANSACTION
router.delete("/:id", authMiddleware, deleteTransaction);
module.exports = router;