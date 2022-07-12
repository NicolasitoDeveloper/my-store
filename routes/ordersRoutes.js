const express = require('express');
const OrdersService = require('../services/ordersServices');
const validatorHandler = require('../middlewares/validatorHandler');
const { getOrderSchema, createOrderSchema } = require('../schemas-DTO data tranfer object/orderSchema');

const router = express.Router();
const service = new OrdersService();

router.get(
  '/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await service.getOne(id);
      res.json(order);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createOrderSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newOrder = await service.create(body);
    res.status(201).json(newOrder);
  }
);

module.exports = router;
