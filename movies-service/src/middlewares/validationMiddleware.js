const {schema} = require('../schemas/movieSchema');

function validateMovie(req, res, next){
    const {error} = schema.validate(req.body);
    if (error){
        const { details } = error;
        return res.status(422).json(details); //unprocessable entity
    }

    next();
}

module.exports = {
    validateMovie
}