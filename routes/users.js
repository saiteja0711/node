const path = require('path');

const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

router.get('/details', userController.getUsers)
router.post('/', userController.addUser);
router.post('/delete/:id', userController.postDeleteUser);

module.exports = router;