const setupServer = require('./server');
const sequelize = require('./db');
const seedDB = require('./seedData');

async function init() {
  try {
    await sequelize.authenticate(); // connect to database
    require('./models'); // load models
    await sequelize.sync(); // establish DDL
    await seedDB();
    const server = await setupServer();
    const { url } = await server.listen();
    console.log(`🚀 Server ready at ${url}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

init();
