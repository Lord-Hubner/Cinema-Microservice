const { test, expect} = require('@jest/globals');
const server = require('./server.js');
const request = require('supertest');

const apiMock = jest.fn((app, repository) => {
    app.get('/error', (req, res, next) => {
        return res.sendStatus(500); 
    })
});

test('Start', async () => {
    const app = await server.start(apiMock)
    expect(app)
    .toBeTruthy()
})

test('Health check', async () => {
    process.env.PORT = 3001;
    const app = await server.start(apiMock);
    const response = await request(app).get('/health');
    expect(response.status).toEqual(200); 
})

test('Error check', async () => {
    process.env.PORT = 3002;
    const app = await server.start(apiMock);
    const response = await request(app).get('/error');
    expect(response.status).toEqual(500); 
})

test('Stop', async () => {
    const isStopped = await server.stop();
    expect(isStopped)
    .toBeTruthy();
})

