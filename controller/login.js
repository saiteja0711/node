
const Users = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function generateToken(id){
    return jwt.sign({userId:id},'secretkey')
}

exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await Users.findOne({ where: { email: email } });
        
        if (!user) {
            return res.status(404).json({ error: 'User not found!' });
        }

        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Internal server error' });
            }

            if (result) {
                
                return res.json({ success: 'User logged in successfully!',token:generateToken(user.id)});
            } else {
                return res.status(401).json({ error: 'Wrong password!' });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
