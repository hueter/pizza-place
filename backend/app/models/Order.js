const Sequelize = require('sequelize');

const OrderSchema = {
  total: {
    type: Sequelize.FLOAT,
    allowNull: false
  }
};

module.exports = OrderSchema;
