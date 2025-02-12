
let accounts = [];
let currentAccount = null;

const initializeAccount = () => {
  const rollInput = document.getElementById("studentId").value.trim();

  if (!rollInput) {
    alert("Please enter a valid roll number");
    return;
  }

  const accountId = `BANK-${rollInput}`;
  if (accounts.some((acc) => acc.id === accountId)) {
    alert("Account already exists!");
    return;
  }

  const lastDigit = parseInt(rollInput.slice(-1)) || 0;
  const initialDeposit = lastDigit * 1000;

  const formatRegex = /f-/i;
  const hasFormat = formatRegex.test(rollInput);
  const multiplierValue = hasFormat
    ? parseInt(rollInput.split(formatRegex)[1])
    : parseInt(rollInput);

  if (isNaN(multiplierValue) || multiplierValue <= 0) {
    alert(
      "Invalid roll number format. Use:\n- 22F-3638\n- f-5678\n- 1234"
    );
    return;
  }

  const newAccount = {
    id: accountId,
    balance: initialDeposit,
    multiplier: multiplierValue,
    transactions: [
      {
        type: "Initial Deposit",
        amount: initialDeposit,
        date: new Date().toLocaleString(),
      },
    ],
  };

  accounts.push(newAccount);
  currentAccount = newAccount;
  updateAccountSelector();
  updateInterface();
  toggleViews();
  document.getElementById("studentId").value = "";
};

const toggleAccountCreation = () => {
  document.getElementById("accountSetup").classList.toggle("hidden");
  document.getElementById("bankInterface").classList.toggle("hidden");
};

const updateAccountSelector = () => {
  const selector = document.getElementById("accountSelector");
  selector.innerHTML = accounts
    .map(
      (acc) =>
        `<option value="${acc.id}" ${
          currentAccount?.id === acc.id ? "selected" : ""
        }>
              ${acc.id}
          </option>`
    )
    .join("");
};

const switchAccount = (accountId) => {
  currentAccount = accounts.find((acc) => acc.id === accountId);
  updateInterface();
};

const handleDeposit = () => {
  if (!currentAccount) return;

  const amount = parseFloat(document.getElementById("txnAmount").value);
  if (isNaN(amount) || amount <= 0) {
    alert("Please enter a valid amount");
    return;
  }

  if (amount % currentAccount.multiplier !== 0) {
    alert(`Deposits must be multiples of ${currentAccount.multiplier}`);
    return;
  }

  currentAccount.balance += amount;
  currentAccount.transactions.push({
    type: "Deposit",
    amount: amount,
    date: new Date().toLocaleString(),
  });

  updateInterface();
};

const handleWithdrawal = () => {
  if (!currentAccount) return;

  const amount = parseFloat(document.getElementById("txnAmount").value);
  if (isNaN(amount) || amount <= 0) {
    alert("Please enter a valid amount");
    return;
  }

  const maxWithdrawal = currentAccount.balance * 0.8;
  if (amount > maxWithdrawal) {
    alert(`Withdrawal limit: ${maxWithdrawal.toFixed(2)} PKR`);
    return;
  }

  currentAccount.balance -= amount;
  currentAccount.transactions.push({
    type: "Withdrawal",
    amount: amount,
    date: new Date().toLocaleString(),
  });

  updateInterface();
};

const updateInterface = () => {
  if (!currentAccount) return;

  document.getElementById("acctNumber").textContent = currentAccount.id;
  document.getElementById("currentBalance").textContent =
    currentAccount.balance.toFixed(2);

  const txnList = document.getElementById("txnHistory");
  txnList.innerHTML = currentAccount.transactions
    .map(
      (txn) => `
          <li class="transaction-item">
              <span>${txn.date}</span>
              <span>${txn.type}: ${txn.amount.toFixed(2)} PKR</span>
          </li>
      `
    )
    .join("");

  document.getElementById("txnAmount").value = "";
  updateAccountSelector();
};

const toggleViews = () => {
  document.getElementById("accountSetup").classList.add("hidden");
  document.getElementById("bankInterface").classList.remove("hidden");
};

const saveTransactions = () => {
  if (!currentAccount) return;

  const data = currentAccount.transactions
    .map((t) => `${t.date}\t${t.type}\t${t.amount.toFixed(2)} PKR`)
    .join("\n");

  const blob = new Blob([data], { type: "text/plain" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${currentAccount.id}_transactions.txt`;
  link.click();
};