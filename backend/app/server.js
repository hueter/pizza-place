const { ApolloServer } = require('apollo-server');
const { merge } = require('lodash');
const toppings = require('./types/toppings/toppings.resolvers');
const pizzas = require('./types/pizzas/pizzas.resolvers');
const orders = require('./types/orders/orders.resolvers');
const users = require('./types/users/users.resolvers');
const loadTypeSchema = require('./helpers/loadTypeSchema');
const DateScalar = require('./helpers/DateScalar');

async function setupServer() {
  const rootSchema = `
  scalar Date

  schema {
    query: Query
    mutation: Mutation
  }
`;

  const types = ['toppings', 'pizzas', 'orders', 'users'];
  const schemaTypes = await Promise.all(types.map(loadTypeSchema));

  const server = new ApolloServer({
    typeDefs: [rootSchema, ...schemaTypes],
    resolvers: merge({}, DateScalar, toppings, pizzas, orders, users),
    context({ req }) {
      // use the authenticate function from utils to auth req, its Async!
      return { user: null };
    }
  });

  return server;
}

module.exports = setupServer;
