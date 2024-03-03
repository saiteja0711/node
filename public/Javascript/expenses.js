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

function showpremium(){
    document.getElementById("rzp-button1").style.display = 'none';
    const listItem = document.createElement('li');
    listItem.textContent = "You are a premium user";
    
    //show leader board
    const inputElement = document.createElement('input')
    inputElement.type="button"
    inputElement.value= "Show Leaderboard"
    listItem.appendChild(inputElement);
    document.getElementById('content').appendChild(listItem);
    
    inputElement.onclick = async()=>{
        const userLeaderboard = await axios.get('http://localhost:3000/premium/showleaderboard')
        let Leaderboard = document.getElementById('leaderboard')
        Leaderboard.innerHTML+=`<h1>Leaderboard<h1>`
        console.log(userLeaderboard.data[0].id)
        userLeaderboard.data.forEach((userDetails) =>{
          Leaderboard.innerHTML+=`<li>Name-${userDetails.name} TotalExpense-${userDetails.totalExpense}</li>`
        })
    }

}

async function displayExpenses() {
    try {
        const expense = await axios.get('http://localhost:3000/expenses/details',{
            headers: { Authorization: token },
          });
        console.log(expense);
        expenseList.innerHTML+=`<h1>Expenses<h1>`
        expense.data.forEach(expenses => {
            const listItem = document.createElement('li');
            listItem.textContent = `${expenses.expenseAmount} - ${expenses.expenseDescription} - ${expenses.expenseCategory} `;
            
           const inputElement = document.createElement('input')
           inputElement.type="button"
           inputElement.value= "Delete Expense"
           listItem.appendChild(inputElement);

           expenseList.appendChild(listItem); 

           inputElement.onclick = async(e)=>{
            let item = e.target.parentElement;
            console.log(item);
            let id= expenses.id

            try {
                let deletb=await axios.delete(`http://localhost:3000/expenses/delete/${id}`,{headers:{"Authorization":token}});
                console.log(deletb)
                listItem.remove();
              } catch (err) {
                console.log(err);
              }
            }
        });
    } catch (error) {
        console.error('Error fetching expenses:', error);
        // Handle error if fetching expenses fails
    }
}
function parseJwt(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        
        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error('Error parsing JWT:', error);
        return null;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    
    if (!token) {
      // Handle the case where the token is missing
      console.error('Token not found. Please log in.');
      return;
    }
    const decoded = parseJwt(token);
    console.log('Decoded token:', decoded);
    const isPremium = decoded.ispremium;

    if (isPremium) {
      showpremium();
      }
    displayExpenses();
    document.getElementById('rzp-button1').onclick = buyPremiumHandler;
  });
  

async function buyPremiumHandler(e) {
    try {
        const promise = await axios.get('http://localhost:3000/purchase/premiumpay', { headers: { 'Authorization': token } });
        console.log('promise is', promise);
        let options = {
            "key": promise.data.key_id,
            "order_id": promise.data.order.id,
            handler: async function (promise) {
                const res= await axios.post('http://localhost:3000/purchase/updatetransaction', {
                    order_id: options.order_id,
                    payment_id: options.key
                }, { headers: { "Authorization": token } });

                alert('You are a Premium User');
               
                localStorage.setItem('token', res.data.token);
                
                showpremium();
                
                
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
        alert('Failed to fetch payment details. Please try again.');
    }
}
