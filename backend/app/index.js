const server = require('./server');
const sequelize = require('./db');
const seedDB = require('./seedData');

async function start() {
  try {
    await sequelize.authenticate(); // connect to database
    await sequelize.sync(); // establish DDL
    await seedDB();
    const { url } = await server.listen();
    console.log(`🚀 Server ready at ${url}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

start();
