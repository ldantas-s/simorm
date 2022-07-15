const {
  ActionQueries,
  ActionQueriesLabels,
} = require('./enums/QueryActions.js');

class Parser {
  constructor() {
    this.actions = new Map([
      [ActionQueries.CREATE, /create \w+ (\w+) \(([\w+\s\w+,]+)\)/i],
      [ActionQueries.INSERT, /insert \w+\s(\w+)\s\((.+)\)\s\w+\s\((.+)\)/i],
      [ActionQueries.SELECT, /select ([\w+, \w+]+|\*) from (\w+)/i],
      // [
      //   ActionQueries.SELECT,
      //   /select ([\w+, \w+]+|\*) from (\w+) where (\w+) = (\w+)/,
      // ],
      [ActionQueries.DELETE, /delete from (\w+) where (\w+) = (\w+)/i],
    ]);
  }

  parse(statement) {
    const parseObj = {
      action: '',
      parsedStatement: [],
    };

    if (!statement) return null;

    this.actions.forEach((value, key) => {
      const parsedStatement = statement.match(value);

      if (!parsedStatement) return;

      Object.assign(parseObj, {
        action: key,
        parsedStatement: parsedStatement.slice(0, 4),
      });
    });

    return parseObj;
  }

  isValid(action) {
    return action && ActionQueriesLabels.includes(action.toLowerCase());
  }
}

module.exports = Parser;
