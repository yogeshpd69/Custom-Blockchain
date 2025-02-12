const Block = require("./Block");

class Blockchain {
  constructor() {
    this.chain = [];
    this.difficulty = 4;
  }

  async createGenesisBlock() {
    const genesisBlock = new Block({ previousHash: "0", nonce: 0 });
    genesisBlock.hash = genesisBlock.calculateHash();
    await genesisBlock.save();
    this.chain.push(genesisBlock);
  }

  async addBlock(transactions) {
    const previousBlock = await Block.findOne().sort({ timestamp: -1 });
    const newBlock = new Block({
      transactions,
      previousHash: previousBlock ? previousBlock.hash : "0",
      nonce: 0,
    });

    newBlock.hash = newBlock.calculateHash();
    while (!newBlock.hash.startsWith("0".repeat(this.difficulty))) {
      newBlock.nonce++;
      newBlock.hash = newBlock.calculateHash();
    }

    await newBlock.save();
    this.chain.push(newBlock);
    return newBlock;
  }
}

module.exports = new Blockchain();
