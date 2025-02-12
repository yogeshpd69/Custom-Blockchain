const mongoose = require("mongoose");
const crypto = require("crypto");

const BlockSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Transaction" }],
  previousHash: String,
  hash: String,
  nonce: Number,
});

BlockSchema.methods.calculateHash = function () {
  return crypto
    .createHash("sha256")
    .update(
      this.previousHash +
        this.timestamp +
        JSON.stringify(this.transactions) +
        this.nonce
    )
    .digest("hex");
};

module.exports = mongoose.model("Block", BlockSchema);
