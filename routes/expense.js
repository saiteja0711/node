const path = require('path');

const express = require('express');

const expenseController = require('../controllers/expense');

const router = express.Router();

router.get('/details', expenseController.getExpense)
router.post('/', expenseController.addExpense);
router.post('/delete/:id', expenseController.postDeleteExpense);

module.exports = router;