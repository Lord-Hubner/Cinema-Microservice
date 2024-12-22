const movies = require('./movies.js');
const {expect, test} = require('@jest/globals');
const mockRepository = require('../repository/__mocks__/repository.js');
const server = require('../server/server.js');
const request = require('supertest');
const { Console } = require('winston/lib/winston/transports/index.js');

let app = null;

beforeAll(async () => {
    process.env.PORT = 3003;
    app = await server.start(movies, mockRepository);
})

afterAll(async () => {
    await server.stop();
})

test('GET /movies/premiere 200', async () => {
    const response = await request(app).get('/movies/premiere');
    expect(response.status).toEqual(200);
    expect(response.body.length).toBeTruthy();
})

test('GET /movies/:id 200', async () => {
    const id = '1';
    const response = await request(app).get(`/movies/${id}`);
    expect(response.status).toEqual(200);
    expect(response.body).toBeTruthy();
})

test('GET /movies 200', async () => {
    const response = await request(app).get('/movies');
    expect(response.status).toEqual(200);
    expect(response.body.length).toBeTruthy();
    expect(Array.isArray(response.body)).toBeTruthy();
})

test('GET /movies/premiere 404 NOT FOUND', async () => {
    const response = await request(app).get('/movies/premiere');
    expect(response.status).toEqual(200);
    expect(response.body.length).toBeTruthy();
})

test('GET /movies/:id 404 NOT FOUND', async () => {
    const id = '-1';
    const response = await request(app).get(`/movies/${id}`);
    expect(response.status).toEqual(404);
})

test('POST /movies 201', async () => {
    const movie = {
        titulo: 'Test Movie',
        sinopse: 'Test Summary',
        dataLancamento: new Date(),
        duracao: 120,    
        imagem: "http://imagem.jpg",
        categorias: ["Aventura"]
    }

    const response = await request(app)
    .post(`/movies`)
    .set('Content-Type', 'application/json')
    .send(movie);
    
    expect(response.status).toEqual(201);
})

test('POST /movies 422 Unprocessable Entity', async () => {
    errorMovie = {}

    const response = await request(app)
    .post('/movies')
    .set('Content-Type', 'application/json')
    .send(errorMovie);
    
    expect(response.status).toEqual(422);
})

test('DELETE /movies/:id No Content 204', async () => {

    const id = '6736cd6bd87cfcdecc1ec141';

    const response = await request(app)
    .delete(`/movies/${id}`);
    
    expect(response.status).toEqual(204);
})

test('DELETE /movies/:id Bad Request 400', async () => {
    const response = await request(app)
    .delete('/movies/1')
    
    expect(response.status).toEqual(400);
})

