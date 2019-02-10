const { Pizza, Size, Topping } = require('../../models');
const Sequelize = require('sequelize');

async function pizzas(_, args, ctx) {
  const pizzas = await Pizza.findAll({
    include: [
      {
        model: Size,
        where: { id: Sequelize.col('pizza.sizeId') },
        attributes: ['inches']
      },
      {
        model: Topping
      }
    ]
  });
  console.log(JSON.stringify(pizzas[0]));
  return pizzas;
}

function pizza(_, args, ctx) {
  return Pizza.findOne({
    where: { id: args.id },
    include: [
      {
        model: Size,
        through: {
          attributes: ['inches']
        }
      },
      {
        model: Topping,
        through: {
          attributes: ['id']
        }
      }
    ]
  });
}

async function newPizza(_, args, ctx) {
  const { size, ...others } = args.input;
  const sizeMap = {
    TWELVE: 12,
    FOURTEEN: 14,
    SIXTEEN: 16,
    EIGHTEEN: 18
  };
  const { id: sizeId } = await Size.find({ where: { inches: sizeMap[size] } });
  const freshPizza = await Pizza.create({
    ...others,
    sizeId
  });
  const { toppings } = args.input;
  const toppingIds = await Topping.findAll({
    where: { name: toppings },
    attributes: ['id']
  });
  await freshPizza.addToppings(toppingIds);

  return freshPizza;
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
