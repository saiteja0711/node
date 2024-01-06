const express=require('express');

const router = express.Router();

const sign = require('../controller/sign');

const login = require('../controller/login');

router.post('/signin', sign.addUser);

router.post('/login',login.loginUser);

module.exports = router;

