const express = require("express");
const CustomersService = require("../services/customerServices");
const validatorHandler = require("../middlewares/validatorHandler");
const { createCustomerSchema, getCustomerSchema, updateCustomerSchema } = require("../schemas-DTO data tranfer object/customerSchema");

const router = express.Router();
const service = new CustomersService();

router.get("/", async (req, res, next) => {
  try {
    const customers = await service.getAll();
    res.json(customers);
  } catch (error) {
    next(error);
  }
});

router.post("/",
  validatorHandler(createCustomerSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCustomer = await service.create(body);
      res.status(201).json(newCustomer);
    } catch (error) {
      next(error);
    }
  }
);

router.patch("/:id",
  validatorHandler(getCustomerSchema, "params"),
  validatorHandler(updateCustomerSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const customer = await service.update(id, body);
      res.json(customer);
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:id",
  validatorHandler(getCustomerSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const resp = await service.delete(id);
      res.json(resp);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
