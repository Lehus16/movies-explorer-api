const SERVER_ERROR_MESSAGE = 'Ошибка на стороне сервера';
const UNAUTHORIZED_ERROR_MESSAGE = 'Неверные авторизационные данные';
const NOT_FOUND_MESSAGE = 'Запрашиваемый ресурс не найден';
const MONGO_CONFLICT_MESSAGE = 'Пользователь с таким email уже существует';
const USER_BAD_REQUEST_MESSAGE = 'Переданы некорректные данные при создании пользователя';
const USER_PATCH_BAD_REQUEST_MESSAGE = 'Переданы некорректные данные при обновлении профиля';
const SUCCESS_LOGIN_MESSAGE = 'Осуществлена авторизация. Вы вошли.';
const SUCCESS_LOGOUT_MESSAGE = 'Вы вышли.';
const USER_NOT_FOUND_MESSAGE = 'Пользователь по указанному _id не найден';
const INVALID_USER_ID_MESSAGE = 'Переданы некорректный ID при обновлении профиля';
const INVALID_USERDATA_MESSAGE = 'Неправильные почта или пароль';
const INVALID_MOVIEDATA_MESSAGE = 'Переданы некорректные данные при добавлении фильма';
const MOVIE_BAD_REQUEST_MESSAGE = 'Переданы некорректные данные при удалении фильма';
const MOVIE_NOT_FOUND_MESSAGE = 'Фильм по указанному _id не найден';
const MOVIE_FORBIDDEN_DELETION_MESSAGE = 'Нельзя удалять чужие фильмы';
const SUCCESS_DELETION_MOVIE_MESSAGE = 'Фильм удален';

module.exports = {
  SERVER_ERROR_MESSAGE,
  UNAUTHORIZED_ERROR_MESSAGE,
  NOT_FOUND_MESSAGE,
  MONGO_CONFLICT_MESSAGE,
  USER_BAD_REQUEST_MESSAGE,
  USER_PATCH_BAD_REQUEST_MESSAGE,
  SUCCESS_LOGIN_MESSAGE,
  SUCCESS_LOGOUT_MESSAGE,
  USER_NOT_FOUND_MESSAGE,
  INVALID_USER_ID_MESSAGE,
  INVALID_USERDATA_MESSAGE,
  INVALID_MOVIEDATA_MESSAGE,
  MOVIE_BAD_REQUEST_MESSAGE,
  MOVIE_NOT_FOUND_MESSAGE,
  MOVIE_FORBIDDEN_DELETION_MESSAGE,
  SUCCESS_DELETION_MOVIE_MESSAGE,
};
