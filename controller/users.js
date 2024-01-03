const Users = require('../models/users');

exports.addUser =((req,res,next)=> {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    

    Users.create({
        name:name,
        email:email,
        password: password
       }).then( result => {
        //console.log(result);
        console.group("created sucessfully");
        res.redirect('/');
      }).catch(err => {
        console.log(err);
        
        res.redirect('/');
      });
});

exports.getUser = ((req,res,next)=> {
    Users.findAll()
    .then (users =>{
        res.json(users);
    })
    .catch(err => console.log(err));
  });
  