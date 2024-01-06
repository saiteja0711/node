let form = document.getElementById('form')
        form.addEventListener('submit', signup)
        
        async function signup(e) {
            e.preventDefault();
            let name = document.getElementById('name').value;
            let email = document.getElementById('email').value;
            let password = document.getElementById('password').value;
            
            let obj = {
                name: name,
                email: email,
                password: password
            }
            
            try {
                let parentNode = document.getElementById('errorMessages');
                parentNode.innerHTML = '';
                
                let promise = await axios.post('http://localhost:3000/user/signin', obj);
                if (promise.data === 'failed') {
                    let childHTML = '<h3>Email is already Taken</h3>';
                    parentNode.innerHTML = parentNode.innerHTML + childHTML;
                    console.log('failed');
                } else {
                    let childHTML = '<h3>Registered Successfully</h3>';
                    parentNode.innerHTML = parentNode.innerHTML + childHTML;
                    console.log('success');
                }
            } catch (err) {
                console.log(err);
            }
        }