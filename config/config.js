//Read ENV variables

require("dotenv").config();

const config = {
  env: process.env.NODE_ENV || "dev",
  isProd: process.env.NODE_ENV === "production",
  port: process.env.PORT || 3020,
  dbUser: process.env.DB_USER || "Nicolasito",
  dbPassword: process.env.DB_PASSWORD || "Nico12",
  dbHost: process.env.DB_HOST || "localhost",
  dbName: process.env.DB_NAME || "my_store",
  dbPort: process.env.DB_PORT || "5432",
  dbUrl: process.env.DATABASE_URL,

}

module.exports = { config };
