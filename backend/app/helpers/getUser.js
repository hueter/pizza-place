const jwt = require('jsonwebtoken');

/**
 * Pull the user out of a token
 * @param {String} token a JWT
 */
function getUser(token) {
  try {
    const { user } = jwt.decode(token);
    return user;
  } catch (error) {
    return null;
  }
}

module.exports = getUser;
