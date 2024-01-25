const { ValidationError, CastError } = require('mongoose').Error;
const bcrypt = require('bcrypt');
const User = require('../models/user');
const generateToken = require('../utils/jwt');

// имппорт ошибок и их кодов
const NotFoundError = require('../errors/notFound');
const BadRequestError = require('../errors/badRequest');
const MongoDuplicateConflict = require('../errors/mongoDuplicate');
const Statuses = require('../utils/codeStatuses');

const SAULT_ROUNDS = 10;

module.exports.signUp = (req, res, next) => {
  const { name, email, password } = req.body;
  // Hash password
  bcrypt.hash(password, SAULT_ROUNDS)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => res.status(Statuses.CREATED).send({
      _id: user.id,
      name: user.name,
      email: user.email,
      // Не передаём пароль
    }))
    .catch((err) => {
      if (err.code === Statuses.MONGO_DUPLICATE) {
        next(new MongoDuplicateConflict('Пользователь с таким email уже существует'));
      } else if (err instanceof ValidationError) {
        next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
      } else {
        next(err);
      }
    });
};

module.exports.signIn = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = generateToken({ _id: user._id });
      res.cookie('jwt', token, {
        maxAge: 3600000,
        httpOnly: true,
        sameSite: true,
      });
      return res.send({ message: 'Осуществлена авторизация. Вы вошли.' });
    })
    .catch(next);
};

module.exports.signOut = (req, res) => {
  res.clearCookie('jwt').send({ message: 'Вы вышли.' });
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError('Пользователь по указанному _id не найден'))
    .then((user) => res.status(Statuses.OK_REQUEST).send(user))
    .catch((err) => {
      next(err);
    });
};
module.exports.patchUserInfo = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .orFail(new NotFoundError('Пользователь по указанному _id не найден'))
    .then((user) => res.status(Statuses.OK_REQUEST).send(user))
    .catch((err) => {
      if (err.code === Statuses.MONGO_DUPLICATE) {
        next(new MongoDuplicateConflict('Пользователь с таким email уже существует'));
      } else if (err instanceof CastError) {
        next(new BadRequestError('Переданы некорректный ID при обновлении профиля'));
      } else if (err instanceof ValidationError) {
        next(new BadRequestError('Переданы некорректные данные при обновлении профиля'));
      } else {
        next(err);
      }
    });
};
