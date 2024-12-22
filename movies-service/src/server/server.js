const express = require('express');
const logger = require('../config/logger');
const morgan = require('morgan');
const helmet = require('helmet');
require('express-async-errors');

let server = null;

async function start(api, repository){
    const app = express();

    app.use(helmet());
    app.use(morgan('dev'));
    app.use(express.json());

    app.get('/health', (req, res, next) => {
            res.send(`Server ${process.env.MS_NAME} is running at ${process.env.PORT}`);
        })

    api(app, repository);

    app.use((error, req, res, next) => {
        logger.error(`${error.stack}`);
        res.sendStatus(500);
    })

    server = app.listen(process.env.PORT, () => {
        console.log(`Server ${process.env.MS_NAME} is running at ${process.env.PORT}`);
    })

    return server;
}

async function stop(){
    if (server) await server.close();
    return true;
}

module.exports = {
    start, stop
}