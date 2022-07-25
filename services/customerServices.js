const boom = require("@hapi/boom");
const { models } = require("../libs/sequelize");

class CustomersService {

  constructor() { }

  async getAll() {
    const customers = await models.Customer.findAll({
      include: ["user"]
    });
    return customers;
  }

  async getOne(id) {
    const customer = await models.Customer.findByPk(id);
    if (!customer) {
      throw boom.notFound("Customer not found");
    }
    return customer;
  }

  async create(data) {
    try {
      const newCustomer = await models.Customer.create(data, {
        include: ["user"]
      });
      return newCustomer;
    } catch (error) {
      return {
        statusCode: 409,
        message: error.errors.message,
        details: error.errors
      }
    }
  }

  async update(id, changes) {
    try {
      const model = await this.getOne(id);
      const resp = await model.update(changes);
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
    const model = await this.getOne(id);
    await model.destroy();
    return {
      id,
      message: "Customer deleted"
    };
  }
}

module.exports = CustomersService;
