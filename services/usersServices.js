const { QueryTypes } = require("sequelize");
const { models, sequelize } = require("../libs/sequelize");


class UsersService {

  constructor() {
  }

  async getAll() {
    const resp = await models.User.findAll();
    return resp;
  }

  async getOne(id) {
    const query = "SELECT * FROM users where id = ?"
    const [data] = await sequelize.query(query, {
      replacements: [id],
      type: QueryTypes.SELECT
    }
    );
    return data;
  }

  async create(data) {
    let { username, lastname, firstname, email, city } = data;
    const queryId = "SELECT (MAX(ID) + 1) AS ID FROM USERS";
    const [findedId] = await sequelize.query(queryId);
    const { id } = findedId[0];

    const query = "INSERT INTO USERS (ID, USERNAME, LASTNAME, FIRSTNAME, EMAIL, CITY) VALUES (:id, :username, :lastname, :firstname, :email, :city)";
    await sequelize.query(query, {
      replacements: {
        id: id,
        username: username,
        lastname: lastname,
        firstname: firstname,
        email: email,
        city: city
      },
    });
    return {
      id,
      ...data,
    };
  }

  async update(id, changes) {
    const datasQuery = [];
    const updateData = {
      id,
      ...changes
    };

    Object.keys(changes).forEach(key => datasQuery.push(`${key} = :${key}`));
    const query = `UPDATE USERS SET ${datasQuery.join(", ")} WHERE ID = :id`;
    await sequelize.query(query, {
      replacements: updateData
    });
    return updateData;
  }

  async delete(id) {
    const query = "DELETE FROM USERS WHERE ID = :id";
    await sequelize.query(query, {
      replacements: {
        id: id
      }
    });
    return {
      id,
      message: "User deleted"
    };
  }
}

module.exports = UsersService;
