const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized');
const { UNAUTHORIZED_ERROR_MESSAGE } = require('../utils/responseMessages');

const { JWT_SECRET, NODE_ENV } = process.env;
const { JWT_SECRET_DEV } = require('../utils/dev.env.config');

module.exports = (req, res, next) => {
  let payload;
  try {
    const { cookies } = req;
    if ((cookies && cookies.jwt)) {
      const token = cookies.jwt;
      payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_DEV);
      req.user = payload;
      next();
    } else {
      next(new UnauthorizedError(UNAUTHORIZED_ERROR_MESSAGE));
    }
  } catch (error) {
    next(new UnauthorizedError(UNAUTHORIZED_ERROR_MESSAGE));
  }
};
