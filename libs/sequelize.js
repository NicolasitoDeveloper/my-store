const { Sequelize } = require('sequelize');

const { config } = require("./../config/config");
const setupModels = require("./../db/models");

const options = {
  dialect: "postgres",
  logging: config.isProd ? false : true,
}

if (config.isProd) {
  options.ssl = {
    rejectUnauthorized: false
  }
}
const sequilize = new Sequelize(config.dbUrl, options);

setupModels(sequilize);

module.exports = sequilize;
