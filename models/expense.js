const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const User = sequelize.define('expenses',{
  id: {
    type : Sequelize.INTEGER,
    autoIncrement: true,
    allowNull : false,
    primaryKey : true
  },
  expense : Sequelize.STRING,
  description : {
    type : Sequelize.STRING,
    allowNull: false
  },
  category : {
    type : Sequelize.STRING,
    allowNull: false
  }
});

module.exports = User;