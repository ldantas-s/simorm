const DatabaseError = require('../src/DatabaseError');

describe('DatabaseError', () => {
  it('should return the correct object databaserror', () => {
    expect(new DatabaseError('statements sqls', 'error message')).toMatchObject(
      {
        message: 'error message',
        statement: 'statements sqls',
      }
    );
  });

  it('should return an error message if the arguments is undefined', () => {
    try {
      new DatabaseError();
    } catch (err) {
      expect(err.message).toBe('Please defined a message');
    }
  });
});
