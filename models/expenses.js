const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Expenses = sequelize.define('expenses',{
  id: {
    type : Sequelize.INTEGER,
    autoIncrement: true,
    allowNull : false,
    primaryKey : true
  },
  expenseAmount : Sequelize.STRING,
 
  expenseDescription : Sequelize.STRING,

  expenseCategory:Sequelize.STRING

});

module.exports = Expenses;