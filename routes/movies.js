const moviesRouter = require('express').Router();
const { creatingMovieValidation, moviesIdValidation } = require('../middlewares/celebrateValidation');
const { getMovie, addMovie, deleteMovie } = require('../controllers/movies');

moviesRouter.get('/', getMovie);
moviesRouter.post('/', creatingMovieValidation, addMovie);
moviesRouter.delete('/:movieId', moviesIdValidation, deleteMovie);

module.exports = moviesRouter;
