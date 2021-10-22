class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

module.exports = BadRequestError;

//  invalid data passed to the methods for creating a card/user or updating a user's avatar/profile
