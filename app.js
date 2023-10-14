const path= require('path');

const http = require('http');

const bodyparser= require('body-parser');

const express= require('express');

const app= express();

// app.use ((req,res,next) => {
//     console.log('In the middleware :');
//     next();
// });

// app.use('/',(req,res,next) => {
//     console.log("This always runs!")
//     next();
// })

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const contactRoutes = require('./routes/contact');
const SuccessRoutes = require('./routes/Success');

 app.use(bodyparser.urlencoded({extended: false}));
 app.use(express.static(path.join(__dirname,"public")))

// app.use ('/add-product',(req,res,next) => {
//     //console.log('In another middleware :');
//     res.send('<form action="/product" method="POST"><input type="text" name="title"><input type="text" name="size"><button type="submit">Add Product</button></form>');
   
// });

// app.post('/product',(req,res,next) => {
//      console.log(req.body); 
//     res.redirect('/');
// })

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(contactRoutes);
app.use(SuccessRoutes);


// app.use ('/',(req,res,next) => {
//     //console.log('In another middleware :');
//     res.send('<h1> Hello from Express</h1>');
//     //res.send( { key1: value })
// });
 app.use((req,res,next) =>{
    res.status(404).sendFile(path.join(__dirname,'views','404.html'));
 })


//const server=http.createServer(app);

app.listen(3000);
