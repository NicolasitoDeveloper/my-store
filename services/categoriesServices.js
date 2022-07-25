const boom = require('@hapi/boom');
const { models } = require("../libs/sequelize");

class CategoriesService {

  constructor() { }

  async getAll() {
    const categories = await models.Category.findAll();
    return categories;
  }

  async getOne(id) {
    const category = await models.Category.findByPk(id, {
      include: ["products"]
    });
    if (!category) {
      throw boom.notFound("Category not found");
    }
    return category;
  }

  async create(data) {
    try {
      const newCategory = await models.Category.create(data)
      return newCategory;
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
      const category = await this.getOne(id);
      const resp = await category.update(changes);
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
    const category = await this.getOne(id);
    await category.destroy();
    return {
      id,
      message: "Category deleted"
    };
  }
}

module.exports = CategoriesService;
