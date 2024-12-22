const database = require('../config/database');
const {ObjectId} = require('mongodb');

async function getAllCities(){
    const db = await database.connect(); 
    return await db.collection('cinemaCatalog')
    .find({})
    .project({cidade: 1, uf: 1, pais: 1})
    .toArray();
}

async function getCinemasByCityId(id){
    const objId = new ObjectId(id);
    const db = await database.connect();

    const city =  await db.collection('cinemaCatalog')
    .findOne({_id: objId}, {projection: {cinemas: 1}});

    return city.cinemas;
}

async function getMoviesByCinemaId(id){
    const objCinemaId = new ObjectId(id);
    const db = await database.connect();

    const query = await db.collection('cinemaCatalog')
    .aggregate([{$match: {"cinemas._id": objCinemaId}},
        { $unwind: "$cinemas"},
        { $unwind: "$cinemas.salas"},
        { $unwind: "$cinemas.salas.sessoes"},
        { $group: {_id: { "titulo": "$cinemas.salas.sessoes.filme", "_id": "$cinemas.salas.sessoes.idFilme"}}}])
        .toArray();

    return query.map(element => element._id);
}

async function getMoviesByCityId(id){
    const objCityId = new ObjectId(id);
    const db = await database.connect();

    const query = await db.collection('cinemaCatalog')
    .aggregate([{$match: {"_id": objCityId}},
        { $unwind: "$cinemas"},
        { $unwind: "$cinemas.salas"},
        { $unwind: "$cinemas.salas.sessoes"},
        { $group: {_id: { "titulo": "$cinemas.salas.sessoes.filme", "_id": "$cinemas.salas.sessoes.idFilme"}}}])
        .toArray();

    return query.map(element => element._id);
}

async function getMovieSessionsByCityId(movieId, cityId){
    const objMovieId = new ObjectId(movieId);
    const objCityId = new ObjectId(cityId);
    const db = await database.connect();

    // const query = await db.collection('cinemaCatalog')
    // .aggregate([{$match: {"_id": objCityId}},
    //     { $unwind: "$cinemas"},
    //     { $unwind: "$cinemas.salas"},
    //     { $unwind: "$cinemas.salas.sessoes"},
    //     { $match: {"cinemas.salas.sessoes.idFilme": objMovieId}},
    //     { $group: {_id: 
    //         { "titulo": "$cinemas.salas.sessoes.filme", 
    //         "idFilme": "$cinemas.salas.sessoes.idFilme",
    //         "cinema": "$cinemas.nome",
    //         "sala": "$cinemas.salas.nome",
    //         "data": "$cinemas.salas.sessoes.data",
    //         "valor": "$cinemas.salas.sessoes.valor",
    //         "assentos": "$cinemas.salas.sessoes.assentos"},
    //     }}])
    //     .toArray();

         const query = await db.collection('cinemaCatalog')
    .aggregate([{$match: {"_id": objCityId}},
        { $unwind: "$cinemas"},
        { $unwind: "$cinemas.salas"},
        { $unwind: "$cinemas.salas.sessoes"},
        { $match: {"cinemas.salas.sessoes.idFilme": objMovieId}},
        { $unwind: "$cinemas.salas.sessoes.assentos"},
        { $group: {_id: 
            { "titulo": "$cinemas.salas.sessoes.filme", 
            "_id": "$cinemas.salas.sessoes.idFilme",
            "cinema": "$cinemas._id",
            "sala": "$cinemas.salas.nome",
            "data": "$cinemas.salas.sessoes.data",
            "valor": "$cinemas.salas.sessoes.valor"},
            assentos: { $push: "$cinemas.salas.sessoes.assentos"}
        }}])
        .toArray();

    // return query.map(element => {
    //     console.log("Assentos before flattening:", element); // Debug
    //     return element._id;
    // });

    return query.map(element => {
        const result = {
            ...element._id,
            assentos: element.assentos
        }
        return result;
    });
}

async function getMovieSessionsByCinemaId(movieId, cinemaId){
    const objCinemaId = new ObjectId(cinemaId)
    let objMovieId = new ObjectId(movieId)

    const db = await database.connect()
    const group = await db.collection('cinemaCatalog').aggregate([
        { $match: { "cinemas._id": objCinemaId} },
        { $unwind: "$cinemas"},
        { $unwind: "$cinemas.salas"},
        { $unwind: "$cinmeas.salas.sessoes"},
        { $match: {"cinemas.salas.sessoes.idFilme": objMovieId} },
        { $group: { 
            _id: {
                 titulo: "$cinemas.salas.sessoes.filme", 
                _id: "$cinemas.salas.sessoes.idFilme",
                cinema: "$cinemas.nome",
                idCinema: "$cinemas._id",
                sala: "$cinemas.salas.nome",
                sessao: "$cinemas.salas.sessoes"
            }
        }}  
    ]).toArray();

    return group
}


module.exports = {
    getAllCities, 
    getCinemasByCityId, 
    getMoviesByCinemaId, 
    getMoviesByCityId, 
    getMovieSessionsByCityId,
    getMovieSessionsByCinemaId
}