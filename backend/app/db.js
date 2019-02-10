const Sequelize = require('sequelize');

module.exports = new Sequelize('matter', 'matter_user', 'pizza123', {
  host: 'mysql',
  dialect: 'mysql',
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
