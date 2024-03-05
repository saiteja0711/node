let form = document.getElementById('expenseForm');
let expenseList = document.getElementById('expenseList');
let table = document.getElementById("myTable");
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

    downloadbtn() 

}

async function displayExpenses() {
    try {
        const expense = await axios.get('http://localhost:3000/expenses/details', {
            headers: { Authorization: token },
        });
        console.log(expense);
        expenseList.innerHTML += `<h1>Expenses<h1>`
        tableHeader();
        expense.data.forEach(expenses => {
            var row = table.insertRow();
            row.className = "row";
            row.id = `${expenses.id}`;
            var cell1 = row.insertCell(-1);
            var cell2 = row.insertCell(-1);
            var cell3 = row.insertCell(-1);
            var cell4 = row.insertCell(-1);

            cell1.innerHTML = `${expenses.expenseCategory}`;
            cell2.innerHTML = `${expenses.expenseDescription}`;
            cell3.innerHTML = `${expenses.expenseAmount}`;
            cell4.innerHTML = `<input type="button" value="Delete Expense" class="delete"></input>`;
        })

        // Add event listener for delete buttons using event delegation
        table.addEventListener('click', async (e) => {
            if (e.target.classList.contains('delete')) {
                const row = e.target.closest('tr');
                let id = e.target.parentElement.parentElement.id;
                
                try {
                    await axios.delete(`http://localhost:3000/expenses/delete/${id}`, {
                        headers: { Authorization: token }
                    });
                    row.remove();
                } catch (err) {
                    console.error('Error deleting expense:', err);
                }
            }
        });
    } catch (error) {
        console.error('Error fetching expenses:', error);
    }
}
async function downloadbtn() {
    const btn = document.createElement("input");
    btn.type = "button";
    btn.value = "Download";
    const div = document.getElementById("premium");
    div.appendChild(btn);
    btn.onclick = async () => {
      let promise = await axios.get("http://localhost:3000/expenses/download",{headers:{Authorization:token}});
      console.log(promise)
      if(promise.status==200){
        let a=document.createElement('a')
        a.href=promise.data.fileURL
        a.download='myexpense.csv'
        a.click()
      }
    };
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
 
  function tableHeader(){
    
    var row = table.insertRow();
    var cell1 = row.insertCell(-1);
    var cell2 = row.insertCell(-1);
    var cell3 = row.insertCell(-1);
    var cell4 = row.insertCell(-1);

    cell1.innerHTML = "<b><pre> Category </pre<b>";
    cell2.innerHTML = "<b><pre> Description </pre><b>";
    cell3.innerHTML = "<b><pre>  Amount </pre><b>";
    cell4.innerHTML = "<b><pre> Changes </pre><b>";

  }
  

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
