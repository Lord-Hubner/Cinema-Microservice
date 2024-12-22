const movies = [{
    "_id": "6736cd6bd87cfcdecc1ec141",
    "titulo": "Os Vingadores: Guerra Infinita",
    "sinopse": "Os heróis mais poderosos da Marvel enfrentando o Thanos",
    "duracao": 120,
    "dataLancamento": new Date("2024-11-14T00:00:00.000Z"),
    "imagem": "http://www.luiztools.com.br/vingadores-gi.jpg",
    "categorias": [
      "Aventura",
      "Ação"
    ]
  },
  {
    "_id": "6736cd6bd87cfcdecc1ec142",
    "titulo": "Os Vingadores: Era de Ultron",
    "sinopse": "Os heróis mais poderosos da Marvel enfrentando o Ultron",
    "duracao": 110,
    "dataLancamento": new Date("2016-05-01T00:00:00.000Z"),
    "imagem": "http://www.luiztools.com.br/vingadores-eu.jpg",
    "categorias": [
      "Aventura",
      "Ação"
    ]
  },
  {
    "_id": "6736cd6bd87cfcdecc1ec143",
    "titulo": "Os Vingadores",
    "sinopse": "Os heróis mais poderosos da Marvel enfrentando o Loki",
    "duracao": 100,
    "dataLancamento": new Date("2014-05-01T00:00:00.000Z"),
    "imagem": "http://www.luiztools.com.br/vingadores.jpg",
    "categorias": [
      "Aventura",
      "Ação"
    ]
  }]

async function getAllMovies(){
    return movies
}

async function getMovieById(id){
    if (id == -1)
      return null;

    const newMovies = Object.assign({}, movies);
    console.log(newMovies);

    newMovies[0]._id = id;
    return newMovies[0];
}

async function getMoviePremieres(){
    movies[0].dataLancamento = new Date();
    return [movies[0]];
}

async function addMovie(movie){
  if (!movie)
    throw Error("Filme informado inválido.")

  return movies[0];
}

async function deleteMovie(id){
  if (!id)
    throw Error("Id informado inválido.")
  return 
}

module.exports = {
    getAllMovies, 
    getMovieById, 
    getMoviePremieres,
    addMovie,
    deleteMovie
}