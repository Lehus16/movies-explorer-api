const statusCodes = require('../utils/codeStatuses');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCodes.NOT_FOUND;
  }
}

module.exports = NotFoundError;
