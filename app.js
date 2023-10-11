// const http = require('http');

// const fs = require('fs');

// const bodyparser= require('body-parser');

// const express= require('express');

// let name="";

// const app= express();

// app.use(bodyparser.urlencoded({extended: false}));
// app.use(express.json());

// app.use ('/login',(req,res,next) => {
    
//     res.send('<body><form action="/ll" method="POST"><input type="text" name="userName"><button type="submit">Login</button></form></body>');
   
// });

// app.post('/ll',(req,res,next) => {
//      //console.log(req.body.userName);
//      name=req.body.userName;
//      res.send(`<script>localStorage.setItem("userName", "${name}");</script>`);
     
      
//     res.redirect('/');
// });



//  app.post('/message',(req,res,next)   =>
//  {
//    const message=`${name} : ${req.body.message} `;
//    //console.log(req.body);

//    fs.appendFileSync('userMessage.txt',message,(err) => {
      
//     if(err){
//         console.log(err);
//     }
//   });
//   res.redirect('/');

//  });
//  app.use ('/',(req,res,next) => {
//     fs.readFile("userMessage.txt" ,(err, data) => {
//       if(err)
//       {
//           console.log(err);
//           fs.writeFileSync('userMessage.txt',"No chats exist");

//       }
 
//     res.send(`<body>${data}
//     <form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>`);
// }
// )
// });

 

//  const server = http.createServer(app);
// server.listen(3000);


const http = require('http');
const fs = require('fs');
const bodyParser = require('body-parser');
const express = require('express');

let name = '';
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
;
app.use(express.json());

app.use('/login', (req, res, next) => {
    res.send('<body><form action="/ll" method="POST"><input type="text" name="userName"><button type="submit">Login</button></form></body>');
});

app.post('/ll', (req, res, next) => {
    name = req.body.userName;
    res.redirect('/');
});

app.post('/message', (req, res, next) => {
    const message = `${name} : ${req.body.message} `;
    fs.appendFileSync('userMessage.txt', message  , (err) => {
        if (err) {
            console.log(err);
        }
    });
    res.redirect('/');
});

app.use('/', (req, res, next) => {
    try {
        const data = fs.readFileSync('userMessage.txt', 'utf8');
        res.send(`
            <script>
                // Set the username in localStorage on the client-side
                localStorage.setItem('username', '${name}');
            </script>
            <body>${data}
            <form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form>
        `);
    } catch (err) {
        console.error(err);
        fs.writeFileSync('userMessage.txt', '');
        res.send('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
    }
});

const server = http.createServer(app);
server.listen(3000);
