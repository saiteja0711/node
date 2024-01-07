const Users = require('../models/users');
const bcrypt = require('bcrypt');

exports.addUser = async (req, res, next) => {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        
        const saltRounds = 10;
      bcrypt.hash(password, saltRounds, async(err,hash)=>{
        console.log(err)
        try {
            await Users.create({ name, email, password: hash });
            res.status(201).json({ message: 'Successfully created new user' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Error creating user' });
        };
     });
} catch (err) {
        res.status(500).json(err);
    }
};


