const server = require('./server');

async function start() {
  try {
    await require('./db'); // connect to database
    const { url } = await server.listen();
    console.log(`🚀 Server ready at ${url}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

start();
