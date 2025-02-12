const API_URL = "http://localhost:5000";

async function addTransaction() {
  const sender = document.getElementById("sender").value;
  const receiver = document.getElementById("receiver").value;
  const amount = document.getElementById("amount").value;

  if (!sender || !receiver || !amount) {
    alert("Please fill all fields");
    return;
  }

  await fetch(`${API_URL}/transactions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sender, receiver, amount }),
  });

  alert("Transaction added!");
}

async function mineBlock() {
  document.getElementById("status-message").textContent =
    "⛏️ Mining in progress...";

  await fetch(`${API_URL}/blockchain/mine`, { method: "POST" });

  document.getElementById("status-message").textContent =
    "✅ Block successfully mined!";
  loadBlockchain();
}

async function loadBlockchain() {
  const response = await fetch(`${API_URL}/blockchain`);
  const blockchain = await response.json();
  const container = document.getElementById("blockchain-container");
  container.innerHTML = "";

  blockchain.forEach((block) => {
    const blockDiv = document.createElement("div");
    blockDiv.classList.add("block");

    blockDiv.innerHTML = `
            <h3>Block</h3>
            <p><strong>Previous Hash:</strong> <span class="hash">${
              block.previousHash
            }</span></p>
            <p><strong>Nonce:</strong> ${block.nonce}</p>
            <p><strong>Hash:</strong> <span class="hash">${
              block.hash
            }</span></p>
            <div class="pending-transactions">
                <h4>Transactions</h4>
                ${block.transactions
                  .map(
                    (tx) => `
                    <p><strong>Sender:</strong> ${tx.sender}</p>
                    <p><strong>Receiver:</strong> ${tx.receiver}</p>
                    <p><strong>Amount:</strong> ${tx.amount}</p>
                    <hr>
                `
                  )
                  .join("")}
            </div>
        `;

    container.appendChild(blockDiv);
  });
}

loadBlockchain();
