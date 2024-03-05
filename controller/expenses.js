const Expense = require('../models/expenses');
const User = require('../models/users');
const DownloadedFiles = require('../models/downloadedfiles')
const sequelize = require('../util/database');
const S3services = require('../services/S3services');
const UserServices = require('../services/userservices');

const addExpense = async (req, res, next) => {
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

const getExpense = ((req,res,next)=> {
    Expense.findAll({where:{userId : req.user.id}})
    .then (expense =>{
        //console.log(expense);
        res.json(expense);
    })
    .catch(err => console.log(err));
  });


  const downloadExpenses =  async(req, res,next) => {
    try {
    const expenses =  await Expense.findAll({where:{userId : req.user.id}});
    //console.log(expenses);
    const stringifiedExpenses = JSON.stringify(expenses);
    const userId = req.user.id;

    const filename = `Expenses${userId}/${new Date()}.txt`;
    const fileURL = await S3services.uploadToS3(stringifiedExpenses,filename);
    await DownloadedFiles.create({
        fileURL:fileURL,
        userId:userId
    })
    
    res.status(200).json ({ fileURL, success: true});
    }
    catch (err){
        console.error(err);
        res.status(500).json({fileURL:'',success:false,err:err});

    }

}

  

const postDeleteExpense = async (req, res,next) => {
    const t =await sequelize.transaction();
   try {
    const expenseId = req.params.id;
    let expense  =await Expense.findByPk(expenseId)
     let destroy=await expense.destroy({where:{userId:req.user.id},transaction:t});
     console.log("Deleted Sucessfully");
     const totalExpense = Number(req.user.totalExpense)-Number(expense.expenseAmount);
     let user=await User.update(
        { totalExpense: totalExpense} ,
        {where: { id: req.user.id },transaction:t}
    );
     await t.commit();
     return res.json({ success: 'succesfully deleted' });
   
     }catch(err){
        await t.rollback();
         console.log(err)
         return res.status(500).json({success:false,error:err})
   
   }
};
module.exports={
    addExpense,
    getExpense,
    downloadExpenses,
    postDeleteExpense
}

