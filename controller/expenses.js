const Expense = require('../models/expenses');

exports.addExpense = ((req, res, next) => {
    console.log("addexpense >>>..",req.user)
    const expenseAmount = req.body.expenseAmount;
    const expenseDescription = req.body.expenseDescription;
    const expenseCategory = req.body.expenseCategory;
   
    Expense.create({
        expenseAmount: expenseAmount,
        expenseDescription: expenseDescription,
        expenseCategory: expenseCategory,
        userId : req.user.id
    }).then((exp)=>{
        const totalExpense=Number(req.user.totalExpense)+Number(exp.examt)
        console.log(req.user.id)
        User.update(
            {totalExpense:totalExpense},
            {where:{id:req.user.id}})
        .then(()=>{
            res.status(200).json({expense:exp})
        })
        .catch(err=>{
            return  res.status(500).json({success:false,error:err})
        })
    });
});

exports.getExpense = ((req,res,next)=> {
    Expense.findAll({where:{userId : req.user.id}})
    .then (expense =>{
        console.log(expense);
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