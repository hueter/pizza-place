const { AuthenticationError } = require('apollo-server');

function parseHeaderForToken(headers) {
  if (!headers.authorization) {
    return null;
  }

  if (headers.authorization.indexOf('Bearer ') !== 0) {
    throw new AuthenticationError(
      'Token does not conform to proper authorization header format: "Bearer <token>"'
    );
  }

  const token = headers.authorization.slice(7);
  return token;
}

module.exports = parseHeaderForToken;
