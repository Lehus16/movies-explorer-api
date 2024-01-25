const statusCodes = require('../utils/codeStatuses');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCodes.UNAUTHORIZED;
  }
}

module.exports = UnauthorizedError;
