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

        console.log(response);
        if (response.data.success) {
            alert(response.data.success);
            window.location.href = '/login';
        } else {
            alert(response.data.error || 'Login failed');
        }
    } catch (error) {
        if (error.response) {
            if (error.response.status === 401) {
                alert('Wrong password!');
                
            } else if (error.response.status === 404) {
                alert('User not found!');
                
            }
        } else {
            console.error(error);
            errorMessages.innerHTML = '<p>Failed to sign in. Please try again.</p>';
        }
    }
});

