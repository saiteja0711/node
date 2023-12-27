const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('./util/database');

const blogController = require('./controller/blogs');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, 'views','index.html'));
    
});

app.get('/details', blogController.getBlogs);
app.post('/',blogController.addBlogs);

sequelize
.sync()
.then (result =>{
    //console.log(result);
    app.listen(3000);
})
.catch(err => {
    console.log(err);
});