const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete','root','Teja@8081', {
    dialect:'mysql',
    host :'localhost'
});

module.exports = sequelize;