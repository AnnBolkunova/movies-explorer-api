const mongoose = require('mongoose');
const { URL_REGEX } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
    minlength: 2,
  },
  director: {
    type: String,
    required: true,
    minlength: 2,
  },
  duration: {
    type: Number,
    required: true,
    min: 0.1,
  },
  year: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 4,
  },
  description: {
    type: String,
    required: true,
    minlength: 2,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (link) => URL_REGEX.test(link),
      message: () => 'некорректный URL',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (link) => URL_REGEX.test(link),
      message: () => 'некорректный URL',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (link) => URL_REGEX.test(link),
      message: () => 'некорректный URL',
    },
  },
  owner: {
    type: mongoose.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
    minlength: 2,
  },
  nameEN: {
    type: String,
    required: true,
    minlength: 2,
  },
});

module.exports = mongoose.model('movie', movieSchema);
