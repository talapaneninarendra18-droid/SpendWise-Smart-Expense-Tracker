// 1. HTML Elements
const form = document.getElementById("transaction-form");
const title = document.getElementById("title");
const amount = document.getElementById("amount");
const type = document.getElementById("type");

const income = document.getElementById("income");
const expenses = document.getElementById("expenses");
const balance = document.getElementById("balance");
const list = document.getElementById("Transactions-list");

// 2. Store transactions
let transactions = [];

// 3. Add Transaction
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = title.value.trim();
  const money = Number(amount.value);
  const category = type.value;

  if (!name || !Number.isFinite(money) || money <= 0) {
    alert("Enter a valid name and amount");
    return;
  }

  const transaction = {
    id: Date.now() + Math.random(),
    name: name,
    money: money,
    category: category
  };

  transactions.push(transaction);

  // Clear and update
  title.value = "";
  amount.value = "";

  showTransactions();
  calculateTotal();
});

// 4. Show Transactions
function showTransactions() {
  list.innerHTML=""

  transactions.forEach(function (item) {
    const li = document.createElement("li");
    const text = document.createElement("span");

    text.textContent =
      item.name + " - " +
      (item.category === "income" ? "+" : "-") +
      "₹" + item.money;

    const button = document.createElement("button");
    button.textContent = "Delete";
    button.type = "button";

    button.addEventListener("click", function () {
      transactions = transactions.filter(function (t) {
        return t.id !== item.id;
      });

      showTransactions();
      calculateTotal();
    });

    li.append(text, button);
    list.appendChild(li);
  });
}

// 5. Calculate Totals
function calculateTotal() {
  let totalIncome = 0;
  let totalExpenses = 0;

  transactions.forEach(function (item) {
    if (item.category === "income") {
      totalIncome += item.money;
    } else {
      totalExpenses += item.money;
    }
  });

  income.textContent = "₹" + totalIncome;
  expenses.textContent = "₹" + totalExpenses;
  balance.textContent = "₹" + (totalIncome - totalExpenses);
}
