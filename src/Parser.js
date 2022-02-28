import { ActionQueries, ActionQueriesLabels } from "./enums/QueryActions";

export class Parser {
  constructor() {
    this.actions = new Map([
      [ActionQueries.CREATE, /(\w+) (\w+) (\w+) \(([\w+\s\w+,]+)\)/],
      [ActionQueries.INSERT, /\w+\s\w+\s(\w+)\s\((.+)\)\s\w+\s\((.+)\)/],
      [ActionQueries.SELECT, /select ([\w+, \w+]+|\*) from (\w+)/],
      // [
      //   ActionQueries.SELECT,
      //   /select ([\w+, \w+]+|\*) from (\w+) where (\w+) = (\w+)/,
      // ],
      [ActionQueries.DELETE, /delete from (\w+) where (\w+) = (\w+)/],
    ]);
  }

  parse(statement) {
    const parseObj = {
      action: "",
      parsedStatement: [],
    };

    this.actions.forEach((value, key) => {
      const parsedStatement = statement.match(value);

      if (!parsedStatement) return;

      Object.assign(parseObj, {
        action: key,
        parsedStatement,
      });
    });

    return parseObj;
  }

  isValid(action) {
    return ActionQueriesLabels.includes(action);
  }
}
