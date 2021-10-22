class AuthorizationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = AuthorizationError;

// an invalid username or password passed. Also if an invalid JWT is passed
