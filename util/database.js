const Sequelize = require('sequelize');

const sequelize = new Sequelize('blogs-data','root','Teja@8081', {
    dialect:'mysql',
    host :'localhost'
});

module.exports = sequelize;