const { celebrate, Joi } = require('celebrate');

const { URL_REGEX } = require('./constants');

module.exports.validationUserCreate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

module.exports.validationLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

module.exports.validationProfileUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email(),
  }),
});

module.exports.validationMovieCreate = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(2),
    director: Joi.string().required().min(2),
    duration: Joi.number().required().min(0.1),
    year: Joi.string().required().min(4).max(4),
    description: Joi.string().required().min(2),
    image: Joi.string().regex(URL_REGEX).uri({ scheme: ['http', 'https'] }).required(),
    trailerLink: Joi.string().regex(URL_REGEX).uri({ scheme: ['http', 'https'] }).required(),
    thumbnail: Joi.string().regex(URL_REGEX).uri({ scheme: ['http', 'https'] }).required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required().min(2),
    nameEN: Joi.string().required().min(2),
  }),
});

module.exports.validationMovieDelete = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24),
  }),
});
