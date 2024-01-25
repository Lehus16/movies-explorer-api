const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: {
      value: true,
      message: 'Это поле обязательно к заполнению',
    },
  },
  director: {
    type: String,
    required: {
      value: true,
      message: 'Это поле обязательно к заполнению',
    },
  },
  duration: {
    type: Number,
    required: {
      value: true,
      message: 'Это поле обязательно к заполнению',
    },
  },
  year: {
    type: String,
    required: {
      value: true,
      message: 'Это поле обязательно к заполнению',
    },
  },
  description: {
    type: String,
    required: {
      value: true,
      message: 'Это поле обязательно к заполнению',
    },
  },
  image: {
    type: String,
    required: {
      value: true,
      message: 'Это поле обязательно к заполнению',
    },
    validate: {
      validator: (link) => isURL(link),
      message: 'Здесь должен быть URL',
    },
  },
  trailerLink: {
    type: String,
    required: {
      value: true,
      message: 'Это поле обязательно к заполнению',
    },
    validate: {
      validator: (link) => isURL(link),
      message: 'Здесь должен быть URL',
    },
  },
  thumbnail: {
    type: String,
    required: {
      value: true,
      message: 'Это поле обязательно к заполнению',
    },
    validate: {
      validator: (link) => isURL(link),
      message: 'Здесь должен быть URL',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: {
      value: true,
      message: 'Это поле обязательно к заполнению',
    },
  },
  movieId: {
    type: Number,
    required: {
      value: true,
      message: 'Это поле обязательно к заполнению',
    },
  },
  nameRU: {
    type: String,
    required: {
      value: true,
      message: 'Это поле обязательно к заполнению',
    },
  },
  nameEN: {
    type: String,
    required: {
      value: true,
      message: 'Это поле обязательно к заполнению',
    },
  },
});

module.exports = mongoose.model('movie', movieSchema);
