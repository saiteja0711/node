const form = document.getElementById('form');
const errorMessages = document.getElementById('errorMessages');

form.addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    try {
        const response = await axios.post('http://localhost:3000/user/login', {
            email: email,
            password: password
        });

        if (response.data === 'userNotFound') {
            alert('User not found!');
            window.location.href = '/login'; 
        } else if (response.data === 'wrongPassword') {
            alert('Wrong Password!');
            window.location.href = '/login'; 
        } else if (response.data === 'success') {
            
            alert('User Loged In!');
            
            window.location.href = '/login'; 
             
            
        }
    } catch (error) {
        console.error(error);
        errorMessages.innerHTML = '<p>Failed to sign in. Please try again.</p>';
    }
});
