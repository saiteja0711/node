let form = document.getElementById('expenseForm');
let expenseList = document.getElementById('expenseList');

form.addEventListener('submit', addExpense);

async function addExpense(e) {
    e.preventDefault();
    let expenseAmount = document.getElementById('expenseAmount').value;
    let expenseDescription = document.getElementById('expenseDescription').value;
    let expenseCategory = document.getElementById('expenseCategory').value;

    let obj = {
        expenseAmount: expenseAmount,
        expenseDescription: expenseDescription,
        expenseCategory: expenseCategory
    };
    try {
        let response = await axios.post('http://localhost:3000/expenses/addexpenses', obj);
        if (response.data.success) {
            alert(response.data.success);
            window.location.href = '/expenses';
        }
    } catch (err) {
        console.log(err);
    }
}

async function displayExpenses() {
    try {
        const expense = await axios.get('http://localhost:3000/expenses/details');
        console.log(expense);

        expense.data.forEach(expenses => {
            const listItem = document.createElement('li');
            listItem.textContent = `${expenses.expenseAmount} - ${expenses.expenseDescription} - ${expenses.expenseCategory} `;

            const deleteForm = document.createElement('form');
            deleteForm.action = `/expenses/delete/${expenses.id}`;
            deleteForm.method = 'POST';

            const deleteButton = document.createElement('button');
            deleteButton.className = 'Delete-Task';
            deleteButton.textContent = 'Delete';

            deleteForm.appendChild(deleteButton);
            listItem.appendChild(deleteForm);

            expenseList.appendChild(listItem); 

            deleteForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                try {
                    await axios.post(deleteForm.action);
                    listItem.remove(); 
                } catch (error) {
                    console.error('Error deleting:', error);
                    // Handle error if deletion fails
                }
            });
        });
    } catch (error) {
        console.error('Error fetching expenses:', error);
        // Handle error if fetching expenses fails
    }
}

displayExpenses();
