const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const isEmail = require('validator/lib/isEmail');

const UnauthorizedError = require('../errors/unauthorized');
const { INVALID_USERDATA_MESSAGE } = require('../utils/responseMessages');

const userSchema = new mongoose.Schema({
  email: {
    required: {
      value: true,
      message: 'Это поле обязательно к заполнению',
    },
    type: String,
    unique: {
      value: true,
      message: 'Пользователь с таким email уже существует',
    },
    validate: {
      validator: (email) => isEmail(email),
      message: (props) => `${props.value} - некорректный адрес почты`,
    },
  },
  password: {
    type: String,
    required: {
      value: true,
      message: 'Это поле обязательно к заполнению',
    },
    select: false,

  },
  name: {
    type: String,
    minlength: [2, 'Введите минимум 2 символа'],
    maxlength: [30, 'Максимум 30 символов'],
  },

});

userSchema.statics.findUserByCredentials = function findOneFunc(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError(INVALID_USERDATA_MESSAGE));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError(INVALID_USERDATA_MESSAGE));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
