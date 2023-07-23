import { ActionQueries } from '../enums/QueryActions';

export const queries = [
  [ActionQueries.SELECT, /select ([\w+, \w+]+|\*) from (\w+)/i],
  [ActionQueries.CREATE, /create \w+ (\w+) \(([\w+\s\w+,]+)\)/i],
  [ActionQueries.INSERT, /insert \w+\s(\w+)\s\((.+)\)\s\w+\s\((.+)\)/i],
  [ActionQueries.DELETE, /delete from (\w+) where (\w+) = (\w+)/i],
  // [
  //   ActionQueries.SELECT,
  //   /select ([\w+, \w+]+|\*) from (\w+) where (\w+) = (\w+)/,
  // ],
];
