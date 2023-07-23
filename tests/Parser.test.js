import { Parser } from '../src/Parser';

describe('isValid', () => {
  const parser = new Parser();

  it('should return true when method is valid and is lower caser', () => {
    expect(parser.isValid('create')).toBeTruthy();
  });

  it('should return true when method is valid and is uppercase', () => {
    expect(parser.isValid('CREATE')).toBeTruthy();
  });

  it('should return false when the argument does not exist', () => {
    expect(parser.isValid('anyMethod')).toBeFalsy();
  });

  it('should return false when the argument is falsy', () => {
    expect(parser.isValid(null)).toBeFalsy();
  });
});

describe('parse', () => {
  const parser = new Parser();

  it('should return the correct object when the method is an insert', () => {
    const objParse = parser.parse(
      'insert into author (id, name, age) values (1, Douglas Crockford, 62)'
    );

    expect(objParse).toMatchObject({
      action: 'insert',
      parsedStatement: [
        'insert into author (id, name, age) values (1, Douglas Crockford, 62)',
        'author',
        'id, name, age',
        '1, Douglas Crockford, 62',
      ],
    });
  });

  it('should return the correct object when the method is a create table using uppercase', () => {
    const objParse = parser.parse(
      'CREATE TABLE author (id number, name string, age number, city string, state string, country string)'
    );

    expect(objParse).toMatchObject({
      action: 'create',
      parsedStatement: [
        'CREATE TABLE author (id number, name string, age number, city string, state string, country string)',
        'author',
        'id number, name string, age number, city string, state string, country string',
      ],
    });
  });

  it('should return the correct object when the method is a select', () => {
    const objParse = parser.parse('select name, age from author');

    expect(objParse).toMatchObject({
      action: 'select',
      parsedStatement: ['select name, age from author', 'name, age', 'author'],
    });
  });

  it('should return the correct object when the method is a delete', () => {
    const objParse = parser.parse('delete from author where id = 2');

    expect(objParse).toMatchObject({
      action: 'delete',
      parsedStatement: ['delete from author where id = 2', 'author', 'id', '2'],
    });
  });

  it('should return null if the argument is undefined', () => {
    const objParse = parser.parse();

    expect(objParse).toBeNull();
  });
});
