import { Parser } from "./Parser";
import { ActionQueries } from "./enums/QueryActions";
import { DatabaseError } from "./DatabaseError";

export default class Database {
  constructor() {
    this.tables = {};
    this.parse = new Parser();
  }

  execute(statement) {
    const { action, parsedStatement } = this.parse.parse(statement);

    if (!this.parse.isValid(action)) {
      throw new DatabaseError(statement, `Syntax error: '${statement}'`);
    }

    const actions = {
      [ActionQueries.CREATE]: () => this.create(parsedStatement),
      [ActionQueries.INSERT]: () => this.insert(parsedStatement),
      [ActionQueries.SELECT]: () => this.select(parsedStatement),
      [ActionQueries.DELETE]: () => this.delete(parsedStatement),
    };

    return actions[action]();
  }

  create(parsedStatement) {
    const [, , , tableName, params] = parsedStatement;
    const columns = params?.split(", ");
    this.tables[tableName] = {
      columns: {},
      data: [],
    };

    columns.reduce((columnsObject, tableCurrentColumn) => {
      const [columnName, typeColumn] = tableCurrentColumn.split(" ");
      return Object.assign(columnsObject, { [columnName]: typeColumn });
    }, this.tables[tableName].columns);
  }

  insert(parsedStatement) {
    let [, tableName, fields, values] = parsedStatement;
    fields = fields.split(", ");
    values = values.split(", ");
    const row = fields.reduce(
      (obj, curr, idx) => ({ ...obj, [curr]: values[idx] }),
      {}
    );

    this.tables?.[tableName].data.push(row);
  }

  select(parsedStatement) {
    let [, columns, tableName, columnWhere, valueWhere] = parsedStatement;
    const rowsData = this.tables?.[tableName].data;

    if (columns === "*") return rowsData;

    columns = columns.split(", ");

    const filteredRows = columnWhere
      ? rowsData?.filter((row) => row[columnWhere] === valueWhere)
      : rowsData;

    const selectedDatas = filteredRows.map((value) =>
      columns.reduce(
        (obj, curr) => (value[curr] ? { ...obj, [curr]: value[curr] } : obj),
        {}
      )
    );

    return selectedDatas;
  }

  delete(parsedStatement) {
    const [, tableName, columnWhere, valueWhere] = parsedStatement;
    Object.defineProperty(this.tables?.[tableName], "data", {
      value: this.tables?.[tableName].data.filter(
        (row) => row[columnWhere] !== valueWhere
      ),
    });
  }
}
