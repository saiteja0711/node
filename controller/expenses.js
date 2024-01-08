const Expense = require('../models/expenses');

exports.addExpense = ((req, res, next) => {
    const expenseAmount = req.body.expenseAmount;
    const expenseDescription = req.body.expenseDescription;
    const expenseCategory = req.body.expenseCategory;

    Expense.create({
        expenseAmount: expenseAmount,
        expenseDescription: expenseDescription,
        expenseCategory: expenseCategory
    }).then(result => {
        console.group("created successfully");
        return res.json({ success: 'succesfully added' });
    }).catch(err => {
        console.log(err);
        return res.status(500).json({ error: 'Failed to add expense' });
    });
});

exports.getExpense = ((req,res,next)=> {
    Expense.findAll()
    .then (expense =>{
        res.json(expense);
    })
    .catch(err => console.log(err));
  });
  

  exports.postDeleteExpense = (req, res,next) => {
    const expenseId = req.params.id;
   Expense.findByPk(expenseId)
    .then( expense => {
     return expense.destroy();
    })
     .then (result => {
       console.log("Deleted Sucessfully");
       return res.json({ success: 'succesfully deleted' });
   
     })
    .catch(err => console.log(err));
   
   };