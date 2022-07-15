class DatabaseError {
  constructor(statement, message) {
    if (!message) throw Error('Please defined a message');

    this.statement = statement;
    this.message = message;
  }
}

module.exports = DatabaseError;
