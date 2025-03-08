document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expense-form');
    const expenseNameInput = document.getElementById('expense-name');
    const expenseAmountInput = document.getElementById('expense-amount');
    const expenseList = document.getElementById('expense-list');
    const totalAmountDisplay = document.getElementById('total-amount');

    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    function calculateTotal() {
        return expenses.reduce((acc, expense) => acc + expense.amount, 0);
    }

    function saveExpensesToLocal() {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }

    function updateTotal() {
        totalAmountDisplay.textContent = calculateTotal().toFixed(2);
    }

    function renderExpenses() {
        expenseList.innerHTML = '';
        expenses.forEach(expense => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${expense.name} - $${expense.amount}
                <button data-id="${expense.id}">Delete</button>
            `;
            expenseList.appendChild(li);
        });
        updateTotal();
    }

    expenseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = expenseNameInput.value.trim();
        const amount = parseFloat(expenseAmountInput.value.trim());

        if(name !== '' && !isNaN(amount) && amount > 0) {
            const newExpense = {
                id: Date.now().toString(),
                name,
                amount
            };
            expenses.push(newExpense);
            saveExpensesToLocal();
            renderExpenses();

            expenseNameInput.value = '';
            expenseAmountInput.value = '';
        }

    });

    expenseList.addEventListener('click', (e) => {
        if(e.target.tagName === 'BUTTON') {
            const expenseId = e.target.getAttribute('data-id');
            expenses = expenses.filter(expense => expense.id !== expenseId);
            saveExpensesToLocal();
            renderExpenses();
        }
    })

    renderExpenses();
});