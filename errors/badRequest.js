const statusCodes = require('../utils/codeStatuses');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCodes.BAD_REQUEST;
  }
}

module.exports = BadRequestError;
