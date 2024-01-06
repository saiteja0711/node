const Users = require('../models/users');

exports.loginUser = (req, res) => {
    const { email, password } = req.body;

    Users.findOne({ where: { email: email } })
        .then(user => {
            if (!user) {
                // User with provided email does not exist
                return res.json('userNotFound');
            }

            // Compare the provided password with the user's stored password (you should use a secure method like bcrypt for password hashing)
            if (user.password !== password) {
                // Incorrect password
                return res.json('wrongPassword');
            }

            // User found and password matches, consider it a successful login
            return res.json('success');
        })
        .catch(error => {
            console.error(error);
            return res.status(500).json('error');
        });
};
