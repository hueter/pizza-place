const { ApolloServer, AuthenticationError } = require('apollo-server');
const { merge } = require('lodash');
const toppings = require('./types/toppings/toppings.resolvers');
const pizzas = require('./types/pizzas/pizzas.resolvers');
const orders = require('./types/orders/orders.resolvers');
const users = require('./types/users/users.resolvers');
const sizes = require('./types/sizes/sizes.resolvers');
const loadTypeSchema = require('./helpers/loadTypeSchema');
const DateScalar = require('./helpers/DateScalar');
const getUser = require('./helpers/getUser');
const parseHeaderForToken = require('./helpers/parseHeaderForToken');
require('dotenv').config();

async function setupServer() {
  const rootSchema = `
  scalar Date

  schema {
    query: Query
    mutation: Mutation
  }
`;

  const types = ['toppings', 'sizes', 'pizzas', 'orders', 'users'];
  const schemaTypes = await Promise.all(types.map(loadTypeSchema));

  const server = new ApolloServer({
    typeDefs: [rootSchema, ...schemaTypes],
    resolvers: merge({}, DateScalar, toppings, sizes, pizzas, orders, users),
    context: ({ req }) => {
      // get the user token from the headers
      const token = parseHeaderForToken(req.headers);
      // try to retrieve a user with the token
      const user = getUser(token);
      // if (!user)
      // throw new AuthenticationError('Unauthorized. You need a token.');
      // add the user to the context
      return { user };
    },
    cors: true
  });

  return server;
}

module.exports = setupServer;
