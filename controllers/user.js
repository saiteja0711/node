const User = require('../models/user');

exports.addUser =((req,res,next)=> {
    const name = req.body.name;
    const phoneNumber = req.body.phoneNumber;
    const email = req.body.email;

    User.create({
        name: name,
        phoneNumber: phoneNumber,
        email : email
    }).then( result => {
        //console.log(result);
        console.group("created sucessfully");
        res.redirect('/');
      }).catch(err => {
        console.log(err);
      });
});
 
exports.getUsers = ((req,res,next)=> {
    User.findAll()
    .then (product =>{
        res.json(product);
    })
    .catch(err => console.log(err));
});

exports.postDeleteUser = (req, res,next) => {
    const userId = req.params.id;
    User.findByPk(userId)
    .then( user => {
     return user.destroy();
    })
     .then (result => {
       console.log("Deleted Sucessfully");
       res.redirect('/')
   
     })
    .catch(err => console.log(err));
   
   };