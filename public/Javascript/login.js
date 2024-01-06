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
            errorMessages.innerHTML = '<p>User not found!</p>';
        } else if (response.data === 'wrongPassword') {
            errorMessages.innerHTML = '<p>Incorrect password!</p>';
        } else if (response.data === 'success') {
            // Redirect or do something on successful login
            errorMessages.innerHTML = '<p>User Loged In!</p>';
            window.location.href = '/login'; // Redirect to dashboard after successful 
            
        }
    } catch (error) {
        console.error(error);
        errorMessages.innerHTML = '<p>Failed to sign in. Please try again.</p>';
    }
});
