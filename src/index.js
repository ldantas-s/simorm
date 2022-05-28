import Database from "./Database.js";

const database = new Database();

database
  .execute(
    "create table author (id number, name string, age number, city string, state string, country string)"
  )
  .then(() => {
    return Promise.all([
      database.execute(
        "insert into author (id, name, age) values (1, Douglas Crockford, 62)"
      ),
      database.execute(
        "insert into author (id, name, age) values (2, Linus Torvalds, 47)"
      ),
      database.execute(
        "insert into author (id, name, age) values (3, Martin Fowler, 54)"
      ),
    ]);
  })
  .then(() => {
    console.log(JSON.stringify(database, undefined, "  "));
    return database
      .execute("select name from author")
      .then((result) => console.log(JSON.stringify(result, undefined, "  ")));
  })
  .catch((err) => console.error(err?.message));
// console.log(database.execute("select name, age from author where id = 1"));
// console.log(database.execute("select id, name from author"));
// database.execute("delete from author where id = 2");
// console.log(database.execute("select name, age from author"));
// console.log(database.execute("select * from author"));
// console.log(JSON.stringify(database, null, "\t"));
