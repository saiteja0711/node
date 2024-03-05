const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const DownloadedFiles = sequelize.define('downloadedfiles',{
  id: {
    type : Sequelize.INTEGER,
    autoIncrement: true,
    allowNull : false,
    primaryKey : true
  },
  fileURL : Sequelize.TEXT
 
});

module.exports = DownloadedFiles;