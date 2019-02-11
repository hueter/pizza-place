const { Size } = require('../../models');
const Sequelize = require('sequelize');

async function sizes(_, args, ctx) {
  return Size.findAll();
}

function size(_, args, ctx) {
  return Size.findOne();
}

module.exports = {
  Query: {
    sizes,
    size
  }
};
