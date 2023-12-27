const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Reviews = sequelize.define('reviews',{
  id: {
    type : Sequelize.INTEGER,
    autoIncrement: true,
    allowNull : false,
    primaryKey : true
  },
 companyName : Sequelize.STRING,
 pros : Sequelize.STRING,
 cons  : Sequelize.STRING,
rating : Sequelize.INTEGER
  
  
  
  
});

module.exports = Reviews;