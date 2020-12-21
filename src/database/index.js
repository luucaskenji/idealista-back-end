const { Pool } = require("pg");

const connection = new Pool({
  host: "localhost",
  user: "postgres",
  password: "123456",
  database: "idealista",
  port: 5432,
});

module.exports = connection;