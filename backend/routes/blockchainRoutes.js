const express = require("express");
const Blockchain = require("../models/Blockchain");
const Transaction = require("../models/Transaction");

const router = express.Router();

router.get("/", async (req, res) => {
  const blocks = await Blockchain.chain;
  res.json(blocks);
});

router.post("/mine", async (req, res) => {
  const transactions = await Transaction.find();
  if (transactions.length === 0)
    return res.json({ message: "No transactions to mine" });

  const newBlock = await Blockchain.addBlock(transactions);
  await Transaction.deleteMany();
  res.json({ message: "Block mined successfully!", block: newBlock });
});

module.exports = router;
