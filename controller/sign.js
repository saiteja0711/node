const Users = require('../models/users');

exports.addUser =((req,res,next)=> {

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    let errMessage = "";
    

    Users.create({
        name:name,
        email:email,
        password: password
       }).then( result => {
        console.log('registered succesfully')
        res.json('sucess')
        
        
      }).catch(err => {
        res.json('failed')
        console.log(err);
      });
})

