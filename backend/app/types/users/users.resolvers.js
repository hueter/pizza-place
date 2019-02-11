const { User, Order, Pizza, Topping, Size } = require('../../models');

function users(_, args, ctx) {
  return User.findAll({
    include: [Order]
  });
}

async function user(_, args, ctx) {
  const user = await User.findOne({
    where: { id: args.id },
    include: [
      {
        model: Order,
        include: [
          {
            model: Pizza,
            include: [Topping, Size]
          }
        ]
      }
    ]
  });
  return user;
}

function newUser(_, args, ctx) {
  return User.create({ ...args.input });
}

function removeUser(_, args, ctx) {
  return User.destroy({ where: { id: args.id } });
}

module.exports = {
  Query: {
    users,
    user
  },
  Mutation: {
    newUser,
    removeUser
  }
};
