const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

router.post('/Success',(req,res,next) => {
    res.sendFile(path.join(rootDir,'views','Success.html'));
});

module.exports = router;