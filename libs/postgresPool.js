const { Pool } = require("pg");

  const pool = new Pool({
    host: "localhost",
    post: 5432,
    user: "Nicolasito",
    password: "Nico12",
    database: "my_store",

  });

module.exports = pool;
