const Sequelize = require('sequelize');

const SizeSchema = {
  inches: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  }
};

module.exports = SizeSchema;
