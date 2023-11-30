const expenseList = document.querySelector('#expense-list');

async function displayExpenses() {
    const expense = await axios.get('http://localhost:3000/details');
    console.log(expense);
    
   expense.data.forEach(expenses => {
        const listItem = document.createElement('li');
        listItem.textContent = `${expenses.expense} - ${expenses.description} - ${expenses.category} `;
    
        const editButton = document.createElement('button');
        editButton.className = 'Edit-Task';
        editButton.textContent = 'Edit';

        const deleteForm = document.createElement('form');
        deleteForm.action = `/delete/${expenses.id}`; 
        deleteForm.method = 'POST';
        
        const deleteButton = document.createElement('button');
        deleteButton.className = 'Delete-Task';
        deleteButton.textContent = 'Delete';

        deleteForm.appendChild(deleteButton);
        listItem.appendChild(editButton);
        listItem.appendChild(deleteForm);

        expenseList.appendChild(listItem);

        deleteForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            try {
              await axios.post(deleteForm.action);
              // Optionally, update the UI or perform additional actions after successful deletion
              listItem.remove(); // Remove the list item from the UI after deletion
            } catch (error) {
              console.error('Error deleting:', error);
              // Handle error if deletion fails
            }
          });


    });

}

displayExpenses();

