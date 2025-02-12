const express = require("express");
const Transaction = require("../models/Transaction");

const router = express.Router();

router.post("/", async (req, res) => {
  const { sender, receiver, amount } = req.body;
  const transaction = new Transaction({ sender, receiver, amount });
  await transaction.save();
  res.json({ message: "Transaction added", transaction });
});

router.get("/", async (req, res) => {
  const transactions = await Transaction.find();
  res.json(transactions);
});

module.exports = router;
