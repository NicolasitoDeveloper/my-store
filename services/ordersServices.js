const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class OrderService {
	constructor() {
  }

  async getAll() {
    const orders = await models.Order.findAll({
    });
    return orders;
  }

  async getOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user']
        }
      ]
    });
    if (!order) {
      throw boom.notFound("Order not found");
    }
    return order;
  }

  async create(data) {
    try {
      const newOrder = await models.Order.create(data)
      return newOrder;
    } catch (error) {
      return {
        statusCode: 409,
        message: error.errors.message,
        details: error.errors
      }
    };
  }

  async update(id, changes) {
    try {
      const order = await this.getOne(id);
    const resp = await order.update(changes);
    return resp;
    } catch (error) {
      return {
        statusCode: 409,
        message: error.errors.message,
        details: error.errors
      }
    }
  }

  async delete(id) {
    const order = await this.getOne(id);
    await order.destroy();
    return {
      id,
      message: "Order deleted"
    };
  }
}

module.exports = OrderService;
