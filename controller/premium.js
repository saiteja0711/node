const User = require('../models/users');
const Expense = require('../models/expenses');
const sequelize = require('../util/database');

exports.getleaderboard = async (req, res, next) => {
    try {
        const userLeaderboardDetails = await User.findAll({
            // attributes: [
            //     'id',
            //     'name',
            //     [sequelize.fn('COALESCE', sequelize.fn('SUM', sequelize.col('expenses.expenseAmount')), 0), 'totalExpense']
            // ],
            // include: [{
            //     model: Expense,
            //     attributes: []
            // }],
            // group: ['users.id'],
            // order: [['totalExpense', 'DESC']]
            attributes:['name','totalExpense'],
            order:[['totalExpense','DESC']]
        });

        res.status(200).json(userLeaderboardDetails);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};
