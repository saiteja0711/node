const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Blogs = sequelize.define('blogs',{
  id: {
    type : Sequelize.INTEGER,
    autoIncrement: true,
    allowNull : false,
    primaryKey : true
  },
  blogTitle : Sequelize.STRING,
  blogAuthor : Sequelize.STRING,
  blogContent : {
    type : Sequelize.STRING,
    allowNull: false
  }
  
});

module.exports = Blogs;