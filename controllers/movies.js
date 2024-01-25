const { ValidationError, CastError } = require('mongoose').Error;
const Movie = require('../models/movie');

// имппорт ошибок и их кодов
const NotFoundError = require('../errors/notFound');
const BadRequestError = require('../errors/badRequest');
const ForbiddenError = require('../errors/forbiddenError');
const Statuses = require('../utils/codeStatuses');

module.exports.getMovie = (req, res, next) => {
  const ownerId = req.user._id;
  Movie.find({ owner: ownerId })
    .then((movies) => res.status(Statuses.OK_REQUEST).send(movies.reverse()))
    .catch(next);
};

module.exports.addMovie = (req, res, next) => {
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
  const owner = req.user._id;
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
    owner,
  })
    .then((movie) => movie.populate('owner'))
    .then((movie) => res.status(Statuses.CREATED).send(movie))
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .orFail(new NotFoundError('Фильм по указанному _id не найден'))
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Нельзя удалять чужие фильмы');
      }
      return Movie.deleteOne({ _id: movieId });
    })
    .then(() => res.status(Statuses.OK_REQUEST).send({ message: 'Фильм удален' }))
    .catch((err) => {
      if (err instanceof CastError) {
        next(new BadRequestError('Переданы некорректные данные при удалении фильма'));
      } else {
        next(err);
      }
    });
};
