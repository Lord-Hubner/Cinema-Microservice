const server = require('./server/server');
const repository = require('./repository/repository');
const cinemaCatalog = require('./api/cinemaCatalog');

(async () => {
  try {
    await server.start(cinemaCatalog, repository);
  }
  catch(error){
    console.error(error);
  }
})();