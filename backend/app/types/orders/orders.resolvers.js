const { Order, User, Pizza } = require('../../models');
const Sequelize = require('sequelize');

async function orders(_, args, ctx) {
  const orders = await Order.findAll({
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
function newOrder(_, args, ctx) {}

module.exports = {
  Query: {
    orders,
    order,
    pizzas: order => {
      return Pizza.findAll({ where: { orderId: order.id } });
    }
  },
  Mutation: {
    newOrder
  }
};
