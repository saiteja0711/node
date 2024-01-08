const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('./util/database');

const userRouter = require('./routes/users');

const expenseRouter = require('./routes/expenses')

const cors = require('cors')

const app = express();

app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, 'views','index.html'));
    
});

app.get('/login', function(req, res, next) {
    res.sendFile(path.join(__dirname, 'views','login.html'));
});

app.get('/expenses', function(req, res, next) {
    res.sendFile(path.join(__dirname, 'views','expenses.html'));
});

app.use('/user',userRouter);
app.use('/expenses',expenseRouter);

sequelize
//.sync({force:true})
.sync()
.then (result =>{
    //console.log(result);
    app.listen(3000);
})
.catch(err => {
    console.log(err);
});