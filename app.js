const path = require('path');
const fs = require("fs");
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const sequelize = require('./util/database');
const cors = require('cors')

const user = require('./models/users');
const expenses = require('./models/expenses');
const order = require('./models/order');
const forgotPasswordRequests = require('./models/forgotPasswordRequests');
const DownloadedFiles = require('./models/downloadedfiles')

const userRouter = require('./routes/users');
const expenseRouter = require('./routes/expenses');
const payment = require('./routes/payment')
const premium = require('./routes/premium')
const forgotPassword = require('./routes/forgotPassword')




const app = express();
const accessLogStream=fs.createWriteStream(
    path.join(__dirname,'access.log'),{
    flags:'a'
});


app.use(cors())
app.use(helmet())


// Add contentSecurityPolicy option to allow specific script sources
// app.use(helmet({
//   contentSecurityPolicy: {
//     directives: {
//       defaultSrc: ["'self'", "https://api.razorpay.com"],
//       connectSrc: ["'self'", "https://lumberjack-cx.razorpay.com"],
//       scriptSrc: ["'self'", 'https://checkout.razorpay.com', 'https://cdnjs.cloudflare.com'],
//     },
//   },
// }));

app.use(compression());
app.use(morgan('combined',{stream:accessLogStream}));
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

app.get('/forgotPassword', function(req, res, next) {
    res.sendFile(path.join(__dirname, 'views','forgotPassword.html'));
});


app.use('/user',userRouter);
app.use('/expenses',expenseRouter);
app.use('/purchase',payment);
app.use('/premium',premium)
app.use('/password',forgotPassword)

user.hasMany(expenses);
expenses.belongsTo(user);

user.hasMany(order);
order.belongsTo(user)

user.hasMany(forgotPasswordRequests);
forgotPasswordRequests.belongsTo(user);

user.hasMany(DownloadedFiles);
DownloadedFiles.belongsTo(user);


sequelize
//.sync({force:true})
.sync()
.then (result =>{
   app.listen(3000);
})
.catch(err => {
    console.log(err);
});