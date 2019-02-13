const { Pizza, Size, Topping } = require('../../models');
const { AuthenticationError } = require('apollo-server');
const Sequelize = require('sequelize');

async function pizzas(_, args, ctx) {
  const pizzas = await Pizza.findAll({
    include: [
      {
        model: Size
      },
      {
        model: Topping
      }
    ]
  });
  return pizzas;
}

function pizza(_, args, ctx) {
  return Pizza.findOne({
    where: { id: args.id },
    include: [
      {
        model: Size
      },
      {
        model: Topping
      }
    ]
  });
}

async function newPizza(_, args, ctx) {
  if (!ctx.user) {
    throw new AuthenticationError('You must be logged in to order a pizza.');
  }
  const { input } = args;
  const sizeInches = input.size.inches;
  const toppingNames = input.toppings.map(t => t.name);

  const pizzaAttributes = await Promise.all([
    Size.findOne({
      where: { inches: sizeInches },
      attributes: ['id']
    }),
    Topping.findAll({
      where: { name: toppingNames },
      attributes: ['id']
    })
  ]);

  const { id: sizeId } = pizzaAttributes[0];
  const toppingIds = pizzaAttributes[1];

  const freshPizza = await Pizza.create({ sizeId });
  await freshPizza.setToppings(toppingIds);

  return Pizza.findOne({
    where: { id: freshPizza.id },
    include: [
      {
        model: Size
      },
      {
        model: Topping
      }
    ]
  });
}

module.exports = {
  Query: {
    pizzas,
    pizza
  },
  Mutation: {
    newPizza
  }
};
