const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readFilePromise = promisify(fs.readFile);

async function loadTypeSchema(type) {
  const pathToSchema = path.join(
    process.cwd(),
    `/app/types/${type}/${type}.gql`
  );
  try {
    const schema = await readFilePromise(pathToSchema, { encoding: 'utf-8' });
    return schema;
  } catch (error) {
    return Promise.reject(error);
  }
}

module.exports = loadTypeSchema;
