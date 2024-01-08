const express=require('express');

const router = express.Router();

 const expenses = require('../controller/expenses');

 router.post('/addexpenses',expenses.addExpense);

 router.get('/details',expenses.getExpense);

 router.post('/delete/:id',expenses.postDeleteExpense)

module.exports = router;

