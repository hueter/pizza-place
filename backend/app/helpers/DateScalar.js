const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');

const DateScalar = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date()
        .toISOString()
        .slice(0, 19)
        .replace('T', ' '); // value from the client
    },
    serialize(value) {
      const result = new Date(
        Date.parse(value.toString().replace('-', '/', 'g'))
      );
      return result; // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(ast.value); // ast value is always in string format
      }
      return null;
    }
  })
};

module.exports = DateScalar;
