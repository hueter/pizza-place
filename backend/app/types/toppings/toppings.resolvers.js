const { Topping } = require('../../models');

function toppings(_, args, ctx) {
  return Topping.findAll();
}

function topping(_, args, ctx) {
  return Topping.findOne({ where: { id: args.id } });
}

function removeTopping(_, args, ctx) {
  return Topping.destroy({ where: { id: args.id } });
}

module.exports = {
  Query: {
    toppings,
    topping
  },
  Mutation: {
    removeTopping
  }
};
