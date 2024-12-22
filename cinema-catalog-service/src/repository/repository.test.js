const {test, expect, beforeAll} = require('@jest/globals')
const repository = require('./repository');

let cityId = null;
let cinemaId = null;
let movieId = null;

beforeAll(async () => {
    const cities = await repository.getAllCities();
    cityId = cities[1]._id;

    const cinemas = await repository.getCinemasByCityId(cityId);
    cinemaId = cinemas[0]._id; 

    movieId = cinemas[0].salas[0].sessoes[0].idFilme;
})

test('Getting all cities', async function (){
    const cities = await repository.getAllCities();
    expect(cities).toBeTruthy();
    expect(Array.isArray(cities)).toBeTruthy();
    expect(cities.length).toBeTruthy();
})

test('Getting city cinemas by city id', async function (){
    const cinemas = await repository.getCinemasByCityId(cityId);
    expect(cinemas).toBeTruthy();
    expect(Array.isArray(cinemas)).toBeTruthy();
})

test('Getting movies by cinema id', async function (){
    const movies = await repository.getMoviesByCinemaId(cinemaId);
    expect(movies).toBeTruthy();
    expect(Array.isArray(movies)).toBeTruthy();
    expect(movies.length).toBeTruthy();
})

test('Getting movies by city id', async function (){
    const movies = await repository.getMoviesByCityId(cityId);
    expect(movies).toBeTruthy();
    expect(Array.isArray(movies)).toBeTruthy();
    expect(movies.length).toBeTruthy();
})

test('getting movie sessions by cityId movieId', async function (){
    const sessions = await repository.getMovieSessionsByCityId(movieId, cityId);
    expect(sessions).toBeTruthy();
    expect(Array.isArray(sessions)).toBeTruthy();
    expect(sessions.length).toBeTruthy();
})

test('getMovieSessionsByCinemaId', async function (){
    const sessions = await repository.getMovieSessionsByCinemaId(movieId, cinemaId);
    expect(sessions).toBeTruthy();
    expect(Array.isArray(sessions)).toBeTruthy();
    expect(sessions).toBeTruthy();
})