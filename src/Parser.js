const { ActionQueriesLabels } = require('./enums/QueryActions.js');
const queries = require('./utils/Queries');

class Parser {
  constructor() {
    this.actions = new Map(queries);
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
