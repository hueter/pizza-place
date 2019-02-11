const { Order, User, Pizza } = require('../../models');
const Sequelize = require('sequelize');

async function orders(_, args, ctx) {
  const orders = await Order.findAll({
    order: [['createdAt', 'DESC']],
    include: [
      {
        model: Pizza,
        include: [{ all: true }]
      },
      {
        model: User
      }
    ]
  });

  return orders;
}

function order(_, args, ctx) {
  return Order.findOne({
    where: { id: args.id },
    include: [
      {
        model: Pizza,
        include: [{ all: true }]
      },
      {
        model: User
      }
    ]
  });
}

async function newOrder(_, args, ctx) {
  const { userId, pizzas, total } = args.input;
  const pizzaIDs = pizzas.map(p => p.id);

  const checkPizzas = await Pizza.findAll({ where: { id: pizzaIDs } });
  for (let p of checkPizzas) {
    if (p.orderId !== null) {
      throw new Error(`The pizza with ID ${p.id} was already ordered.`);
    }
  }

  const newOrder = await Order.create({ userId, total });
  await newOrder.setPizzas(pizzaIDs);

  return Order.findOne({
    where: { id: newOrder.id },
    include: [
      {
        model: Pizza,
        include: [{ all: true }]
      },
      {
        model: User
      }
    ]
  });
}

module.exports = {
  Query: {
    orders,
    order
  },
  Mutation: {
    newOrder
  }
};
