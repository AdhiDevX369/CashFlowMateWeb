// select expense form and expense cards section
const expenseForm = document.querySelector('#expense-form');
const expenseCards = document.querySelector('#expense-cards');

// create a new expense card
function createExpenseCard(date, category, amount, description) {
  // create new elements
  const expenseCard = document.createElement('div');
  const expenseDate = document.createElement('div');
  const expenseCategory = document.createElement('div');
  const expenseAmount = document.createElement('div');
  const expenseDescription = document.createElement('div');
  const expenseActions = document.createElement('div');
  const editButton = document.createElement('button');
  const deleteButton = document.createElement('button');

  // add classes to elements
  expenseCard.classList.add('expense-card');
  expenseDate.classList.add('expense-date');
  expenseCategory.classList.add('expense-category');
  expenseAmount.classList.add('expense-amount');
  expenseDescription.classList.add('expense-description');
  expenseActions.classList.add('expense-actions');
  editButton.classList.add('edit-button');
  deleteButton.classList.add('delete-button');

  // set content and attributes of elements
  expenseDate.textContent = date;
  expenseCategory.textContent = category;
  expenseAmount.textContent = '$' + amount.toFixed(2);
  expenseDescription.textContent = description;
  editButton.textContent = 'Edit';
  deleteButton.textContent = 'Delete';

  // append elements to expense card
  expenseActions.appendChild(editButton);
  expenseActions.appendChild(deleteButton);
  expenseCard.appendChild(expenseDate);
  expenseCard.appendChild(expenseCategory);
  expenseCard.appendChild(expenseAmount);
  expenseCard.appendChild(expenseDescription);
  expenseCard.appendChild(expenseActions);

  // add event listeners to buttons
  editButton.addEventListener('click', editExpense);
  deleteButton.addEventListener('click', deleteExpense);

  // append expense card to expense cards section
  expenseCards.appendChild(expenseCard);
}

// add expense to expense cards
function addExpense(event) {
  event.preventDefault();

  // get form data
  const date = expenseForm.date.value;
  const category = expenseForm.category.value;
  const amount = parseFloat(expenseForm.amount.value);
  const description = expenseForm.description.value;

  // create new expense card
  createExpenseCard(date, category, amount, description);

  // clear form inputs
  expenseForm.reset();
}

// edit expense
function editExpense(event) {
  // get expense card
  const expenseCard = event.target.closest('.expense-card');

  // get expense data
  const date = expenseCard.querySelector('.expense-date').textContent;
  const category = expenseCard.querySelector('.expense-category').textContent;
  const amount = parseFloat(expenseCard.querySelector('.expense-amount').textContent.slice(1));
  const description = expenseCard.querySelector('.expense-description').textContent;

  // set form values to expense data
  expenseForm.date.value = date;
  expenseForm.category.value = category;
  expenseForm.amount.value = amount;
  expenseForm.description.value = description;

  // remove expense card
  expenseCard.remove();
}

// delete expense
function deleteExpense(event) {
  // get expense card
  const expenseCard = event.target.closest('.expense-card');

  // remove expense card
  expenseCard.remove();
}

// add event listener to expense form submit button
expenseForm.addEventListener('submit', addExpense);

// add event listener to form clear button
document.querySelector('#clear-form').addEventListener('click', () => expenseForm.reset());
