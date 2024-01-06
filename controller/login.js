const Users = require('../models/users');

exports.loginUser = (req, res) => {
    const { email, password } = req.body;

    Users.findOne({ where: { email: email } })
        .then(user => {
            if (!user) {
               
                
                return res.json('userNotFound');
            }

           
            
            if (user.password !== password) {
               
                
                return res.json('wrongPassword');
            }

            
            
            return res.json('success');
        })
        .catch(error => {
            console.error(error);
            return res.status(500).json('error');
        });
};
