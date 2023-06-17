const expenseList = document.getElementById("expense-list");
const reminderList = document.getElementById("reminder-list");
const expenseForm = document.getElementById("expense-form");
const reminderForm = document.getElementById("reminder-form");
const textInput = document.getElementById("text");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("expense-category");
const dateInput = document.getElementById("exp-date");
const currentTotal = document.getElementById("current");
const totalExpenses = document.getElementById("total");
const budgetInput = document.getElementById("budget");
const alertMessages = document.getElementById("alert-messages");

let budgetAmount = 0;
let totalExpensesAmount = 0;

const budget = prompt("Please enter your budget:");

if (budget) {
    budgetAmount = parseFloat(budget);
    budgetInput.textContent = `$${budgetAmount.toFixed(2)}`;
}

expenseForm.addEventListener("submit", addExpense);
reminderForm.addEventListener("submit", addReminder);

function addExpense(event) {
    event.preventDefault();

    const text = textInput.value.trim();
    const amount = parseFloat(amountInput.value.trim());
    const category = categoryInput.value;
    const date = dateInput.value;

    if (text === "" || isNaN(amount)) {
        return;
    }

    const newRow = document.createElement("tr");
    newRow.classList.add("expense");

    const expenseTextCell = document.createElement("td");
    expenseTextCell.textContent = text;

    const expenseAmountCell = document.createElement("td");
    expenseAmountCell.textContent = `$${amount.toFixed(2)}`;

    const expenseCategoryCell = document.createElement("td");
    expenseCategoryCell.textContent = category;

    const expenseDateCell = document.createElement("td");
    expenseDateCell.textContent = date;

    const deleteButtonCell = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-btn");
    deleteButton.textContent = "x";
    deleteButton.addEventListener("click", deleteExpense);
    deleteButtonCell.appendChild(deleteButton);

    newRow.appendChild(expenseTextCell);
    newRow.appendChild(expenseAmountCell);
    newRow.appendChild(expenseCategoryCell);
    newRow.appendChild(expenseDateCell);
    newRow.appendChild(deleteButtonCell);

    expenseList.querySelector("tbody").appendChild(newRow);

    updateTotal(amount);

    clearExpenseForm();
    checkBudget();
}

function clearExpenseForm() {
    textInput.value = "";
    amountInput.value = "";
    categoryInput.value = "Food";
    dateInput.value = "";
}

function updateTotal(amount) {
    const currentAmount = parseFloat(currentTotal.textContent.slice(1));
    const totalAmount = parseFloat(totalExpenses.textContent.slice(1));

    const newCurrentAmount = currentAmount + amount;
    const newTotalAmount = totalAmount + amount;

    currentTotal.textContent = `$${newCurrentAmount.toFixed(2)}`;
    totalExpenses.textContent = `$${newTotalAmount.toFixed(2)}`;

    totalExpensesAmount = newTotalAmount;

    budgetAmount -= amount;
    budgetInput.textContent = `$${budgetAmount.toFixed(2)}`;


}

function checkBudget() {
    const remainingBudget = budgetAmount - totalExpensesAmount;
    const budgetPercentage = (remainingBudget / budgetAmount) * 100;

    alertMessages.innerHTML = ""; 

    if (remainingBudget === 0) {
        showAlert("Your budget is exhausted!");
        return;
    } else if (remainingBudget < 0) {
        showAlert("Your expenses have exceeded the budget!");
        return;
    } else if (budgetPercentage < 20) {
        showAlert("Your budget is less than 20%!");
        return;
    }
}




function showAlert(message) {
    const alertDiv = document.createElement("div");
    alertDiv.classList.add("alert-messages");
    alertDiv.textContent = message;
    alertMessages.appendChild(alertDiv);
}


function deleteExpense(event) {
    const expenseItem = event.target.parentElement.parentElement;
    const amount = parseFloat(expenseItem.children[1].textContent.slice(1));
    expenseList.querySelector("tbody").removeChild(expenseItem);

    updateTotal(-amount);
    checkBudget(); 
}

function addReminder(event) {
    event.preventDefault();

    const name = document.getElementById("reminder-name").value.trim();
    const amount = parseFloat(document.getElementById("rem-amount").value.trim());
    const dueDate = document.getElementById("reminder-due-date").value;

    if (name === "" || isNaN(amount)) {
        return;
    }

    const newRow = document.createElement("tr");

    const reminderNameCell = document.createElement("td");
    reminderNameCell.textContent = name;

    const reminderAmountCell = document.createElement("td");
    reminderAmountCell.textContent = `$${amount.toFixed(2)}`;

    const reminderDueDateCell = document.createElement("td");
    reminderDueDateCell.textContent = dueDate;

    const deleteButtonCell = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-btn");
    deleteButton.textContent = "x";
    deleteButton.addEventListener("click", deleteReminder);
    deleteButtonCell.appendChild(deleteButton);

    newRow.appendChild(reminderNameCell);
    newRow.appendChild(reminderAmountCell);
    newRow.appendChild(reminderDueDateCell);
    newRow.appendChild(deleteButtonCell);
    reminderList.querySelector("tbody").appendChild(newRow);


    clearReminderForm();
}


function deleteReminder(event) {
    const reminderItem = event.target.parentElement.parentElement;
    reminderList.querySelector("tbody").removeChild(reminderItem);
}

function clearReminderForm() {
    document.getElementById("reminder-name").value = "";
    document.getElementById("rem-amount").value = "";
    document.getElementById("reminder-due-date").value = "";
}