const statusCodes = require('../utils/codeStatuses');

class MongoDuplicateConflict extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCodes.CONFLICT;
  }
}

module.exports = MongoDuplicateConflict;
