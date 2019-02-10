const server = require('./server');
const sequelize = require('./db');

async function start() {
  try {
    await sequelize.authenticate(); // connect to database
    const { User } = require('./models');
    const result = await User.findAll();
    console.log(result);
    const { url } = await server.listen();
    console.log(`🚀 Server ready at ${url}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

start();
