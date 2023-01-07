const Movie = require('../models/movie');

const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const InternalServerError = require('../errors/InternalServerError');
const ForbiddenError = require('../errors/ForbiddenError');
const { STATUS_CREATED } = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send({ data: movies }))
    .catch((err) => {
      next(err);
    });
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movie) => res.status(STATUS_CREATED).send({ data: movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(new InternalServerError(err.message));
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById({ _id: req.params.movieId })
    .then((movie) => {
      if (movie === null) {
        throw new NotFoundError('Фильм не найден');
      } else if (req.user._id !== movie.owner.toString()) {
        throw new ForbiddenError('Нельзя удалить чужие фильмы');
      } else {
        return Movie.findByIdAndRemove(req.params.movieId);
      }
    })
    .then((movieId) => {
      res.send({ movieId });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};
