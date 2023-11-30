const Expense = require('../models/expense');

exports.addExpense =((req,res,next)=> {
    const expense = req.body.expense;
    const description = req.body.description;
    const category = req.body.category;

    Expense.create({
        expense: expense,
        description: description,
        category : category
    }).then( result => {
        //console.log(result);
        console.group("created sucessfully");
        res.redirect('/');
      }).catch(err => {
        console.log(err);
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
     res.redirect('/')
 
   })
  .catch(err => console.log(err));
 
 };