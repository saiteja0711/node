let form = document.getElementById('expenseForm');
let expenseList = document.getElementById('expenseList');
const token = localStorage.getItem("token");
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
        let response = await axios.post('http://localhost:3000/expenses/addexpenses', obj,{
            headers: { Authorization: token },
          });
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
        const expense = await axios.get('http://localhost:3000/expenses/details',{
            headers: { Authorization: token },
          });
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

document.getElementById("rzp-button1").onclick = async function(e) {
    const promise = await axios.get('http://localhost:3000/purchase/premiumpay',{headers :{'Authorization':token}})
    console.log('promise is',promise)
    let options={
        "key":promise.data.key_id,
        "order_id":promise.data.order.id,
        handler:async function(promise){
            await axios.post('http://localhost:000/purchase/updatetransaction',{
                order_id:options.order_id,
                payment_id:options.key},
                {headers:{"Authorization":token}}
            )
            alert('You are a Premium User')
        }
    }
    const rzp1=new Razorpay(options)
    rzp1.open()
    e.preventDefault()
    rzp1.on('payment failed',function(promise){
        console.log(promise)
        alert('something went wrong')
    })

}