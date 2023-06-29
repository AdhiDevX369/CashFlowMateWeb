import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getDatabase, ref, set, onValue, push, remove } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";
// Your Firebase configuration
const firebaseConfig = {

  apiKey: "AIzaSyCwQfdmvUyJiyGo3nHHRrwX00CWnaOf3Oo",
  authDomain: "cashflowmate-10b84.firebaseapp.com",
  databaseURL: "https://cashflowmate-10b84-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "cashflowmate-10b84",
  storageBucket: "cashflowmate-10b84.appspot.com",
  messagingSenderId: "947054792095",
  appId: "1:947054792095:web:41089e6e130d68e14141aa",
  measurementId: "G-HTFBT34F33"
};
// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Get a reference to the database
const database = getDatabase(app);

let totalAmount = document.getElementById("total-amount");
let userAmount = document.getElementById("user-amount");
const checkAmountButton = document.getElementById("check-amount");
const totalAmountButton = document.getElementById("total-amount-button");
const productTitle = document.getElementById("product-title");
const errorMessage = document.getElementById("budget-error");
const productTitleError = document.getElementById("product-title-error");
const productCostError = document.getElementById("product-cost-error");
const amount = document.getElementById("amount");
const expenditureValue = document.getElementById("expenditure-value");
const balanceValue = document.getElementById("balance-amount");
const duration = document.getElementById("duration");
const list = document.getElementById("list");
let tempAmount = 0;

// Set Budget Part
totalAmountButton.addEventListener("click", () => {
  tempAmount = totalAmount.value;
  // Empty or negative input
  if (tempAmount === "" || tempAmount < 0) {
    errorMessage.classList.remove("hide");
  } else {
    errorMessage.classList.add("hide");
    // Set Budget in Realtime Database
    set(ref(database, "budget"), tempAmount);
    // Set Balance
    balanceValue.innerText = tempAmount - expenditureValue.innerText;
    // Clear Input Boxes
    totalAmount.value = "";    
  }
});

// Function To Disable Edit and Delete Button
const disableButtons = (bool) => {
  let editButtons = document.getElementsByClassName("edit");
  Array.from(editButtons).forEach((element) => {
    element.disabled = bool;
  });
};

// Get a reference to the "totalExpenses" location in the database
const totalExpensesRef = ref(database, "totalExpenses");

// Function To Create List
const listCreator = (key, expenseName, expenseValue) => {
  let sublistContent = document.createElement("div");
  sublistContent.classList.add("sublist-content", "flex-space");
  sublistContent.innerHTML = `<p class="product">${expenseName}</p><p class="amount">${expenseValue}</p>`;
  let editButton = document.createElement("button");
  editButton.classList.add("fa-solid", "fa-pen-to-square", "edit");
  editButton.style.fontSize = "1.2em";
  editButton.addEventListener("click", () => {
    modifyElement(key, editButton, true);
  });
  let deleteButton = document.createElement("button");
  deleteButton.classList.add("fa-solid", "fa-trash-can", "delete");
  deleteButton.style.fontSize = "1.2em";
  deleteButton.addEventListener("click", () => {
    modifyElement(key, deleteButton);
  });
  sublistContent.appendChild(editButton);
  sublistContent.appendChild(deleteButton);
  list.appendChild(sublistContent);
};

// Function To Modify List Elements
const modifyElement = (key, element, edit = false) => {
  let parentDiv = element.parentElement;
  let currentBalance = balanceValue.innerText;
  let currentExpense = expenditureValue.innerText;
  let parentAmount = parentDiv.querySelector(".amount").innerText;
  if (edit) {
    let parentText = parentDiv.querySelector(".product").innerText;
    productTitle.value = parentText;
    userAmount.value = parentAmount;
    disableButtons(true);
  }
  balanceValue.innerText = parseInt(currentBalance) + parseInt(parentAmount);
  expenditureValue.innerText =
    parseInt(currentExpense) - parseInt(parentAmount);
  parentDiv.remove();

  // Remove the expense from the database
  remove(ref(database, `expenses/${key}`));

  // Update total expenses in the database
  const totalExpenses = parseInt(expenditureValue.innerText);
  set(totalExpensesRef, totalExpenses);
};

// Function To Add Expenses
checkAmountButton.addEventListener("click", () => {
  // Empty checks
  if (!userAmount.value || !productTitle.value) {
    productTitleError.classList.remove("hide");
    return false;
  }
  // Enable buttons
  disableButtons(false);
  // Expense
  let expenditure = parseInt(userAmount.value);
  // Total expense (existing + new)
  let sum = parseInt(expenditureValue.innerText) + expenditure;
  expenditureValue.innerText = sum;
  // Total balance (budget - total expense)
  const totalBalance = tempAmount - sum;
  balanceValue.innerText = totalBalance;
  // Create list
  const newExpenseRef = push(ref(database, "expenses"));
  const newExpenseKey = newExpenseRef.key;
  set(newExpenseRef, {
    name: productTitle.value,
    amount: expenditure
  });
  listCreator(newExpenseKey, productTitle.value, userAmount.value);
  // Update total expenses in the database
  set(totalExpensesRef, sum);
  // Empty inputs
  productTitle.value = "";
  userAmount.value = "";
});

// Listen for changes in the budget from Realtime Database
onValue(ref(database, "budget"), (snapshot) => {
  amount.innerHTML = snapshot.val();
  tempAmount = snapshot.val();
  balanceValue.innerText = tempAmount - expenditureValue.innerText;
});


// Listen for changes in expenditure from Realtime Database
onValue(ref(database, "expenses"), (snapshot) => {
  const expenses = snapshot.val();
  list.innerHTML = "";
  if (expenses) {
    Object.entries(expenses).forEach(([key, expense]) => {
      listCreator(key, expense.name, expense.amount);
    });
  }
});

// Listen for changes in totalExpenses from Realtime Database
onValue(ref(database, "totalExpenses"), (snapshot) => {
  const totalExpenses = snapshot.val();
  expenditureValue.innerText = totalExpenses || "0";
  balanceValue.innerText = tempAmount - parseInt(expenditureValue.innerText);
});