const Expense = require('../models/expenses');
const User = require('../models/users');
const sequelize = require('../util/database');

exports.addExpense =async (req, res, next) => {
    const t = await sequelize.transaction();
    try{
    const expenseAmount = req.body.expenseAmount;
    const expenseDescription = req.body.expenseDescription;
    const expenseCategory = req.body.expenseCategory;
  
    let exp=await Expense.create({
        expenseAmount: expenseAmount,
        expenseDescription: expenseDescription,
        expenseCategory: expenseCategory,
        userId: req.user.id},
        {transaction:t}
        );
        const totalExpense = Number(req.user.totalExpense) + Number(exp.expenseAmount);
        let user=await User.update(
            { totalExpense: totalExpense} ,
            {where: { id: req.user.id } ,transaction :t}
        );
        await t.commit();
        res.status(200).json({ success: 'Successfully added' });
    } catch(err) {
        await t.rollback();
        console.log(err);
        res.status(500).json({ error: 'Failed to add expense' });
    }
};





exports.getExpense = ((req,res,next)=> {
    Expense.findAll({where:{userId : req.user.id}})
    .then (expense =>{
        console.log(expense);
        res.json(expense);
    })
    .catch(err => console.log(err));
  });
  

  exports.postDeleteExpense = async (req, res,next) => {
    const t =await sequelize.transaction();
   try {
    const expenseId = req.params.id;
    let expense  =await Expense.findByPk(expenseId)
     let destroy=await expense.destroy({where:{userId:req.user.id},transaction:t});
     console.log("Deleted Sucessfully");
     const totalExpense = Number(req.user.totalExpense)-Number(expense.expenseAmount);
     let user=await User.update(
        { totalExpense: totalExpense} ,
        {whre: { id: req.user.id },transaction:t}
    );
     await t.commit();
     return res.json({ success: 'succesfully deleted' });
   
     }catch(err){
        await t.rollback();
         console.log(err)
         return res.status(500).json({success:false,error:err})
   
   }
};

