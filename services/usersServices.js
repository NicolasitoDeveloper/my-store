const { } = require("sequelize");
const { models } = require("../libs/sequelize");
const boom = require('@hapi/boom');

class UsersService {

  constructor() {
  }

  async getAll() {
    const resp = await models.User.findAll();
    return resp;
  }

  async getOne(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound("User not found");
    }
    return user;
  }

  async create(data) {
    try {
      const newUser = await models.User.create(data)
      return newUser;
    } catch (error) {
      return {
        statusCode: 409,
        message: error.errors.message,
        details: error.errors
      }
    };
  }

  async update(id, changes) {
    const user = await this.getOne(id);
    const resp = await user.update(changes);
    return resp;
  }

  async delete(id) {
    const user = await this.getOne(id);
    await user.destroy();
    return {
      id,
      message: "User deleted"
    };
  }
}

module.exports = UsersService;
