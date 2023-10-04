const http = require('http');

const server=http.createServer((req,res)=>{
    console.log("Saiteja");
});

server.listen(4000);