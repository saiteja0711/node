const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('./util/database');

const expenseController = require('./controllers/expense');

const app = express();

const expenseRoutes = require('./routes/expense');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, 'views','index.html'));
    
});

app.use(expenseRoutes);

sequelize
.sync()
.then (result =>{
    //console.log(result);
    app.listen(3000);
})
.catch(err => {
    console.log(err);
});
