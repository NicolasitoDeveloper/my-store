const { Sequelize } = require('sequelize');

const { config } = require("./../config/config");
const setupModels = require("./../db/models");


const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `mysql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`

const sequilize = new Sequelize(URI, {
  dialect: "mysql",
  logging: true,
});

setupModels(sequilize);
sequilize.sync();

module.exports = sequilize;
