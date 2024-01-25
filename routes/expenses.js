const express=require('express');

const router = express.Router();

const userauthenticate = require('../middleware/auth')

 const expenses = require('../controller/expenses');

 router.post('/addexpenses',userauthenticate.authenticate,expenses.addExpense);

 router.get('/details',userauthenticate.authenticate,expenses.getExpense);
 

 router.post('/delete/:id',expenses.postDeleteExpense)

module.exports = router;

