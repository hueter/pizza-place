const { AuthenticationError } = require('apollo-server');
const { Order, User, Pizza } = require('../../models');
const Sequelize = require('sequelize');

async function orders(_, args, ctx) {
  if (!ctx.admin) {
    throw new AuthenticationError('Only admins can query all orders');
  }
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

async function order(_, args, ctx) {
  if (!ctx.user) {
    throw new AuthenticationError('You are not allowed to see that order');
  }
  const order = await Order.findOne({
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

  if (order.userId !== ctx.user.id) {
    throw new AuthenticationError('You are not allowed to see that order');
  } else {
    return order;
  }
}

async function newOrder(_, args, ctx) {
  if (!ctx.user) {
    throw new AuthenticationError('You must be logged in to place an order.');
  }

  const { pizzas, total } = args.input;

  if (pizzas.length === 0) {
    throw new Error(`You must order at least one pizza.`);
  }

  const userId = ctx.user.id;

  const pizzaIDs = pizzas.map(p => p.id);

  const checkPizzas = await Pizza.findAll({ where: { id: pizzaIDs } });
  for (let p of checkPizzas) {
    if (p.orderId !== null) {
      throw new Error(`The pizza with ID ${p.id} was already ordered.`);
    }
  }

  if (checkPizzas.length !== pizzas.length) {
    let invalidPizzaIDs = [];
    for (let pizzaID of pizzaIDs) {
      if (!checkPizzas.find(p => p.id === pizzaID)) {
        invalidPizzaIDs.push(pizzaID);
      }
    }
    throw new Error(
      `The following pizza IDs are invalid: [ ${invalidPizzaIDs.join(', ')} ].`
    );
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
