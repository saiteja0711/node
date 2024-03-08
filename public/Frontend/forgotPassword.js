const form = document.getElementById('form');

form.addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    try {
        const response = await axios.post('http://3.107.41.242:3000/password/forgotPassword', {
            email: email,
        });
       console.log(response);
        
    } catch (error) {
            console.error(error);
        
    }
});