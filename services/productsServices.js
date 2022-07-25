const { models } = require("../libs/sequelize");
const { Op } = require("sequelize");
const boom = require('@hapi/boom');

class ProductsService {

  constructor() {
  }

  async getAll(query) {
    const options = {
      include: ["category"],
      where: {}
    }

    const { limit, offset } = query;
    if (limit && offset) {
      options.limit = limit;
      options.offset = offset
    }

    const { price } = query;
    if (price) {
      options.where.price = price;
    }

    const { price_min, price_max } = query;
    if (price_min && price_max) {
      options.where.price = {
        [Op.gte]: price_min,
        [Op.lte]: price_max
      }
    }

    const products = await models.Product.findAll(options);
    return products;
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
    }
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
