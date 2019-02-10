const Sequelize = require('sequelize');

const ToppingSchema = {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  recommended: {
    type: Sequelize.BOOLEAN
  }
};

module.exports = ToppingSchema;
