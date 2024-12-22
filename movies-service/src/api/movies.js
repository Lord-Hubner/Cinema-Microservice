const validationMiddleware = require('../middlewares/validationMiddleware');


module.exports = (app, repository) => {

    app.get('/movies/premiere', async (req, res, next) => {
        const movies = await repository.getMoviePremieres();

        res.json(movies);
    })

    app.get('/movies', async (req, res, next) => {
        const movies = await repository.getAllMovies()

        res.json(movies);
    })

    app.get('/movies/:id', async (req, res, next) => {
        const movie = await repository.getMovieById(req.params.id);

        if (!movie) return res.sendStatus(404);

        res.json(movie);
    })

    app.post('/movies', validationMiddleware.validateMovie, async (req, res, next) => {
        const titulo = req.body.titulo;
        const sinopse = req.body.sinopse;
        const dataLancamento = req.body.dataLancamento;
        const duracao = parseInt(req.body.duracao);
        const imagem = req.body.imagem;
        const categorias = req.body.categorias;

        const result = await repository.addMovie( {titulo, sinopse, dataLancamento, duracao, imagem, categorias});
        console.log(result)
        res.status(201).json(result)
    })

    app.delete('/movies/:id', async (req, res, next) => {
        const id = req.params.id;

        if (!/(\d|a|b|c|d|e|f){24}/.test(id))
            return res.status(400)
            .send("id inválido!")

        await repository.deleteMovie(id);

        res.sendStatus(204);
    })
}