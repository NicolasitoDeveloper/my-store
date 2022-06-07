const { models } = require("../libs/sequelize");
const boom = require('@hapi/boom');

class ProductsService {

  constructor() {
  }

  async getAll() {
    const resp = await models.Product.findAll();
    return resp;
  }

  async getOne(id) {
    const product = await models.Product.findByPk(id);
    if (!product) {
      throw boom.notFound("Product not found");
    }
    return product;
  }

  async create(data) {
    try {
      const newProduct = await models.Product.create(data)
      return newProduct;
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
      const product = await this.getOne(id);
    const resp = await product.update(changes);
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
    const product = await this.getOne(id);
    await product.destroy();
    return {
      id,
      message: "Product deleted"
    };
  }
}

module.exports = ProductsService;
