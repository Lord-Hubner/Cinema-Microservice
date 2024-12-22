const {test, expect} = require('@jest/globals')
const database = require('./database.js')

test('Connecting database', async () => {
    const connection = await database.connect();
    expect(connection).toBeTruthy();
})

test('Disconnecting database', async () => {
    const isDisconnected = await database.disconnect();
    expect(isDisconnected).toBeTruthy();
})