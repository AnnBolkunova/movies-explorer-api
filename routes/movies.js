const movieRouter = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { validationMovieCreate, validationMovieDelete } = require('../utils/validator');

movieRouter.get('/', getMovies);

movieRouter.post('/', validationMovieCreate, createMovie);

movieRouter.delete('/:movieId', validationMovieDelete, deleteMovie);

module.exports = movieRouter;
