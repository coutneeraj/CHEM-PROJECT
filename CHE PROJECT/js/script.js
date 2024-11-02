let balance = parseFloat(localStorage.getItem('balance')) || 0;
const transactionHistory = JSON.parse(localStorage.getItem('transactionHistory')) || [];
const balanceDisplay = document.getElementById('balance');
const amountInput = document.getElementById('amount');
const transactionHistoryDisplay = document.getElementById('transactionHistory');
const errorDisplay = document.getElementById('error');

// Update UI with the balance and transaction history
function updateUI() {
    balanceDisplay.innerText = balance.toFixed(2);
    transactionHistoryDisplay.innerHTML = '';
    transactionHistory.forEach((transaction) => {
        const listItem = document.createElement('li');
        listItem.innerText = `${transaction.type}: $${transaction.amount.toFixed(2)} on ${transaction.date}`;
        transactionHistoryDisplay.appendChild(listItem);
    });
}

// Save data to localStorage
function saveData() {
    localStorage.setItem('balance', balance);
    localStorage.setItem('transactionHistory', JSON.stringify(transactionHistory));
}

// Add transaction to the history
function addTransaction(type, amount) {
    const date = new Date().toLocaleString();
    transactionHistory.push({ type, amount, date });
    saveData();
    updateUI();
}

// Handle Add Money action
document.getElementById('addButton').addEventListener('click', () => {
    const amount = parseFloat(amountInput.value);
    if (isNaN(amount) || amount <= 0) {
        errorDisplay.innerText = 'Please enter a valid positive amount.';
        return;
    }
    errorDisplay.innerText = '';
    balance += amount;
    addTransaction('Added', amount);
    amountInput.value = '';
});

// Handle Withdraw Money action
document.getElementById('withdrawButton').addEventListener('click', () => {
    const amount = parseFloat(amountInput.value);
    if (isNaN(amount) || amount <= 0) {
        errorDisplay.innerText = 'Please enter a valid positive amount.';
        return;
    }
    if (amount > balance) {
        errorDisplay.innerText = 'Insufficient balance.';
        return;
    }
    errorDisplay.innerText = '';
    balance -= amount;
    addTransaction('Withdrawn', amount);
    amountInput.value = '';
});

// Handle Clear All Transactions
document.getElementById('clearHistory').addEventListener('click', () => {
    if (confirm('Are you sure you want to clear all transactions?')) {
        balance = 0;
        transactionHistory.length = 0;
        saveData();
        updateUI();
    }
});

// Initial setup
updateUI();