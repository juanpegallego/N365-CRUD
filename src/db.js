const { Pool } = require("pg");
const { db, users_db } = require("./config");

const pool = new Pool({
  user: db.user,
  password: db.password,
  host: db.host,
  port: db.port,
  database: db.database,
});

const users_pool = new Pool({
  user: users_db.user,
  password: users_db.password,
  host: users_db.host,
  port: users_db.port,
  database: users_db.database,
});

module.exports = { pool, users_pool };
