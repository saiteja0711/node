const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('./util/database');

const userController = require('./controller/users');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, 'views','index.html'));
    
});

app.get('/details', userController.getUser);
app.post('/',userController.addUser);

sequelize
.sync({force:true})
.then (result =>{
    //console.log(result);
    app.listen(3000);
})
.catch(err => {
    console.log(err);
});