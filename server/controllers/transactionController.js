const Transaction = require("../models/Transaction");

// ADD
exports.addTransaction = async (req, res) => {
  try {
    const { title, type, amount, category, note } = req.body;

    const transaction = await Transaction.create({
      title,
      type,
      amount,
      category,
      note,
      userId: req.user.id,   // 🔥 THIS IS MOST IMPORTANT
    });

    res.status(201).json({
      success: true,
      transaction,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      userId: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      transactions,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE
exports.deleteTransaction = async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};