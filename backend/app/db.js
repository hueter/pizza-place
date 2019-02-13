const Sequelize = require('sequelize');
const { DB, DB_USER, DB_PASSWORD } = require('./config');

module.exports = new Sequelize(DB, DB_USER, DB_PASSWORD, {
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
