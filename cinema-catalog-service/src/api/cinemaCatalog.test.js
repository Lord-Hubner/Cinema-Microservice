const catalogsAPI = require('./cinemaCatalog.js');
const {expect, test} = require('@jest/globals');
const mockRepository = require('../repository/__mocks__/repository.js');
const server = require('../server/server.js');
const request = require('supertest');

let app = null;
beforeAll(async () => {
    process.env.PORT = 3003;
    app = await server.start(catalogsAPI, mockRepository);
})

afterAll(async () => {
    await server.stop();
})

test('GET /cities 200', async () => {
    const response = await request(app).get('/cities');
    expect(response.status).toEqual(200);
    expect(response.body.length).toBeTruthy();
})

test('GET /cities/:cityId/movies 200', async () => {
    const cityId = '1';
    const response = await request(app).get(`/cities/${cityId}/movies`);
    expect(response.status).toEqual(200);
    expect(response.body).toBeTruthy();
})

test('GET /cities/:cityId/movies 404', async () => {
    const cityId = '-1'
    const response = await request(app).get(`/cities/${cityId}/movies`);
    expect(response.status).toEqual(404);
    expect(response.body).toBeTruthy();
})

test('GET /cities/:cityId/cinemas 200', async () => {
    const cityId = '1';
    const response = await request(app).get(`/cities/${cityId}/cinemas`);
    expect(response.status).toEqual(200);
    expect(response.body).toBeTruthy();
})

test('GET /cities/:cityId/cinemas 404', async () => {
    const cityId = '-1';
    const response = await request(app).get(`/cities/${cityId}/cinemas`);
    expect(response.status).toEqual(404);
    expect(response.body).toBeTruthy();
})

test('GET /cities/:cityId/movies/:movieId 200', async () => {
    const cityId = '1'
    const movieId = '1'
    const response = await request(app).get(`/cities/${cityId}/movies/${movieId}`);
    expect(response.status).toEqual(200);
    expect(response.body).toBeTruthy();
})

test('GET /cities/:cityId/movies/:movieId 404', async () => {
    const cityId = '-1'
    const movieId = '-1'
    const response = await request(app).get(`/cities/${cityId}/movies/${movieId}`);
    expect(response.status).toEqual(404);
    expect(response.body).toBeTruthy();
})

test('GET /cinemas/:cinemaId/movies 200', async () => {
    const cinemaId = '1'
    const response = await request(app).get(`/cinemas/${cinemaId}/movies`);
    expect(response.status).toEqual(200);
    expect(response.body).toBeTruthy();
})

test('GET /cinemas/:cinemaId/movies 404', async () => {
    const cinemaId = '-1'
    const response = await request(app).get(`/cinemas/${cinemaId}/movies`);
    expect(response.status).toEqual(404);
    expect(response.body).toBeTruthy();
})

test('GET cinemas/:cinemaId/movies/:movieId 200', async () => {
    const cinemaId = '1'
    const movieId = '1'
    const response = await request(app).get(`/cinemas/${cinemaId}/movies/${movieId}`);
    expect(response.status).toEqual(200);
    expect(response.body).toBeTruthy();
})

test('GET cinemas/:cinemaId/movies/:movieId 404', async () => {
    const cinemaId = '-1'
    const movieId = '-1'
    const response = await request(app).get(`/cinemas/${cinemaId}/movies/${movieId}`);
    expect(response.status).toEqual(404);
    expect(response.body).toBeTruthy();
})



