const { ApolloServer } = require('apollo-server');
const { merge } = require('lodash');
const toppings = require('./types/toppings/toppings.resolvers');
const pizzas = require('./types/pizzas/pizzas.resolvers');
const loadTypeSchema = require('./helpers/loadTypeSchema');

async function setupServer() {
  const rootSchema = `
  schema {
    query: Query
    mutation: Mutation
  }
`;

  const types = ['toppings', 'pizzas'];
  const schemaTypes = await Promise.all(types.map(loadTypeSchema));

  const server = new ApolloServer({
    typeDefs: [rootSchema, ...schemaTypes],
    resolvers: merge({}, toppings, pizzas),
    context({ req }) {
      // use the authenticate function from utils to auth req, its Async!
      return { user: null };
    }
  });

  return server;
}

module.exports = setupServer;
