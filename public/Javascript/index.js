// const bookingList = document.querySelector('#booking-list');
// async function displayBooking() {
//     const users = await axios.get('http://localhost:3000/details');

//     console.log(users.data);
 
//     users.data.forEach(user => {
//         const listItem = document.createElement('li');
//         listItem.textContent = `${user.name} - ${user.phoneNumber} - ${user.email} `;

//     const editButton = document.createElement('button');
//     editButton.className = 'Edit-Task';
//     editButton.textContent = 'Edit';

//    const deleteButton = document.createElement('button');
//    deleteButton.className = 'Delete-Task';
//     deleteButton.textContent = 'Delete';
    
//     listItem.appendChild(editButton);
//     listItem.appendChild(deleteButton);

//     bookingList.appendChild(listItem);
     

//   });
// }

// displayBooking();

// function modifyItem(e) {
//     if (e.target.classList.contains('Delete-Task')) {
//         if (confirm('Are you sure you want to delete this Task?')) {
//             const li = e.target.parentElement;
            
//             const text = li.textContent.split('-');


            
//             incompleted.removeChild(li);
//         }
//     }
// }
const bookingList = document.querySelector('#booking-list');

async function displayBooking() {
  const users = await axios.get('http://localhost:3000/details');

  users.data.forEach(user => {
    const listItem = document.createElement('li');
    listItem.textContent = `${user.name} - ${user.phoneNumber} - ${user.email} `;

    const editButton = document.createElement('button');
    editButton.className = 'Edit-Task';
    editButton.textContent = 'Edit';

    const deleteForm = document.createElement('form');
    deleteForm.action = `/delete/${user.id}`; // Assuming user has an 'id' property
    deleteForm.method = 'POST';

    const deleteButton = document.createElement('button');
    deleteButton.className = 'Delete-Task';
    deleteButton.textContent = 'Delete';

    deleteForm.appendChild(deleteButton);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteForm);

    bookingList.appendChild(listItem);

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

displayBooking();

