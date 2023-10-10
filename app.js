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
 app.use(bodyparser.urlencoded({extended: false}));

app.use ('/add-product',(req,res,next) => {
    //console.log('In another middleware :');
    res.send('<form action="/product" method="POST"><input type="text" name="title"><input type="text" name="size"><button type="submit">Add Product</button></form>');
   
});

app.post('/product',(req,res,next) => {
     console.log(req.body); 
    res.redirect('/');
})

app.use ('/',(req,res,next) => {
    //console.log('In another middleware :');
    res.send('<h1> Hello from Express</h1>');
    //res.send( { key1: value })
});


//const server=http.createServer(app);

app.listen(3000);
