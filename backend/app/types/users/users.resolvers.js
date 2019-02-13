const { AuthenticationError } = require('apollo-server');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const { User, Order, Pizza, Topping, Size } = require('../../models');
const { JWT_SECRET } = require('../../config');

function users(_, args, ctx) {
  if (!ctx.admin) {
    throw new AuthenticationError('Only admins can query all users');
  }
  return User.findAll({
    include: [Order],
    order: [[Order, 'createdAt', 'DESC']]
  });
}

async function user(_, args, ctx) {
  if (!ctx.user || ctx.user.id != args.id) {
    throw new AuthenticationError('You are not allowed to query that user');
  }
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
    ],
    order: [[Order, 'createdAt', 'DESC']]
  });
  return user;
}

async function myProfile(_, args, ctx) {
  if (!ctx.user) {
    throw new AuthenticationError('You must login first.');
  }
  const user = await User.findOne({
    where: { id: ctx.user.id },
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
    ],
    order: [[Order, 'createdAt', 'DESC']]
  });
  return user;
}

function removeUser(_, args, ctx) {
  if (!ctx.user || ctx.user.id !== args.id) {
    throw new AuthenticationError('You are not allowed to remove that user!');
  }
  return User.destroy({ where: { id: args.id } });
}

// Handle user signup
async function signup(_, args, ctx) {
  const { input } = args;
  const { firstName, lastName, email, password } = input;
  const user = await User.create({
    firstName,
    lastName,
    email,
    password: await bcrypt.hash(password, 10)
  });

  // return json web token
  return {
    token: jsonwebtoken.sign(
      { user: { id: user.id, email: user.email } },
      JWT_SECRET,
      {
        expiresIn: '1y'
      }
    )
  };
}

async function login(_, args, ctx) {
  const { email, password } = args;
  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new Error('No user with that email');
  }

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    throw new Error('Incorrect password');
  }

  // return json web token
  return {
    token: jsonwebtoken.sign(
      { user: { id: user.id, email: user.email } },
      JWT_SECRET,
      {
        expiresIn: '1d'
      }
    )
  };
}

module.exports = {
  Query: {
    users,
    user,
    myProfile
  },
  Mutation: {
    removeUser,
    signup,
    login
  }
};
