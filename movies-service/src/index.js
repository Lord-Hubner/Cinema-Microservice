const server = require('./server/server');
const repository = require('./repository/repository');
const movies = require('./api/movies');

(async () => {
  try {
    await server.start(movies, repository);
  }
  catch(error){
    console.error(error);
  }
})();