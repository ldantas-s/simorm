import Database from "./Database";

const database = new Database();

try {
  database.execute(
    "create table author (id number, name string, age number, city string, state string, country string)"
  );
  database.execute(
    "insert into author (id, name, age) values (1, Douglas Crockford, 62)"
  );
  database.execute(
    "insert into author (id, name, age) values (2, Linus Torvalds, 47)"
  );
  database.execute(
    "insert into author (id, name, age) values (3, Martin Fowler, 54)"
  );
  console.log(database.execute("select name, age from author where id = 1"));
  console.log(database.execute("select id, name from author"));
  database.execute("delete from author where id = 2");
  console.log(database.execute("select name, age from author"));
  console.log(database.execute("select * from author"));
  console.log(JSON.stringify(database, null, "\t"));
} catch (err) {
  console.error(err?.message);
}
