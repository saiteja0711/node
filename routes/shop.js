const express = require('express');

const router = express.Router();

router.get ('/',(req,res,next) => {
    //console.log('In another middleware :');
    res.send('<h1> Hello from Express</h1>');
    //res.send( { key1: value })
});

module.exports = router;