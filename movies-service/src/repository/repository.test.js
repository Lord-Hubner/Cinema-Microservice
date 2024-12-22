const {test, expect, beforeAll} = require('@jest/globals')
const repository = require('./repository');

let movieId = null;

beforeAll(async () => {
    const movies = await repository.getAllMovies();
    movieId = movies[0]._id;
})

test('Getting all movies', async function (){
    const movies = await repository.getAllMovies();
    expect(movies).toBeTruthy();
    expect(Array.isArray(movies)).toBeTruthy();
    expect(movies.length).toBeTruthy();
})

test('Getting movie by id', async function (){
    const movie = await repository.getMovieById(movieId);
    expect(movie).toBeTruthy();
    expect(movie._id).toEqual(movieId);
})

test('Getting movie premieres', async function (){

    monthAgo = new Date();
    monthAgo.setMonth(-1);

    const movies = await repository.getMoviePremieres();
    expect(Array.isArray(movies)).toBeTruthy();
    expect(movies.length).toBeTruthy();
    expect(movies[0].dataLancamento.getTime()).toBeGreaterThanOrEqual(monthAgo.getTime())
})

test('addMovie', async function (){
   
    let result;
    try{
        result = await repository.addMovie( { titulo: "Test Movie", sinopse: "Movie Summary", duracao: 120, dataLancamento: new Date(), imagem: "imagem.jpg", categorias: ['Aventura']});
        expect(result).toBeTruthy();
    }
    finally{
        if (result)
            await repository.deleteMovie(result._id)
    }
    
})
