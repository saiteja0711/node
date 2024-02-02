let form = document.getElementById('expenseForm');
let expenseList = document.getElementById('expenseList');
const token = localStorage.getItem("token");
form.addEventListener('submit', addExpense);
//const jwt = require('jsonwebtoken');

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

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
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
function showpremium(){
        document.getElementById("rzp-button1").style.display = 'none';
        const listItem = document.createElement('li');
        listItem.textContent = "You are a premium user";
        document.getElementById('content').appendChild(listItem);

}
document.addEventListener('DOMContentLoaded', function () {

  const decoded= parseJwt(token)
  console.log("decoded token",decoded)
  const ispremium=decoded.ispremium 
  console.log("ispremium token",ispremium)
  
  
  if(ispremium){
    showpremium()
  }
    displayExpenses();

});

document.getElementById("rzp-button1").onclick = async function(e) {
    try {
        const response = await axios.get('http://localhost:3000/purchase/premiumpay', { headers: { 'Authorization': token } });
        console.log('response is', response.data);

        const options = {
            "key": response.data.key_id,
            "order_id": response.data.order.id,
            handler: async function (response) {
                try {
                    await axios.post('http://localhost:3000/purchase/updatetransaction', {
                        order_id: options.order_id,
                        payment_id: options.key
                    }, { headers: { "Authorization": token } });

                    alert('You are a Premium User');

                    localStorage.setItem('token',res.data.token)
                    showpremium();
                } catch (error) {
                    console.error('Error updating transaction:', error);
                    alert('Something went wrong while updating the transaction');
                }
            }
        };

        const rzp1 = new Razorpay(options);
        rzp1.open();
        e.preventDefault();

        rzp1.on('payment.failed', function (response) {
            console.log(response);
            alert('Payment failed. Please try again.');
        });
    } catch (error) {
        console.error('Error fetching payment details:', error);
        alert('Something went wrong while fetching payment details');
    }
};
