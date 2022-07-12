const express = require("express");

const productsRouter = require("./productsRoutes");
const categoriesRouter = require("./categoriesRoutes");
const usersRouter = require("./usersRoutes");
const ordersRouter = require("./ordersRoutes");
const customersRouter = require("./customersRoutes");

function routerApi(app) {
  const router = express.Router();
  app.use("/api/v1", router);
  router.use("/products", productsRouter);
  router.use("/categories", categoriesRouter);
  router.use("/users", usersRouter);
  router.use("/orders", ordersRouter);
  router.use("/customers", customersRouter);
}

module.exports = routerApi;
