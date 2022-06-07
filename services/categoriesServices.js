const { QueryTypes } = require("sequelize");
const { models, sequelize } = require("../libs/sequelize");

class CategoriesService {

  constructor() {
  }

  async getAll() {
    const resp = await models.Category.findAll();
    return resp;
  }

  async getOne(id) {
    const query = "SELECT * FROM categories where id = ?"
    const [data] = await sequelize.query(query, {
      replacements: [id],
      type: QueryTypes.SELECT
    }
    );
    return data;
  }

  async create(data) {
    let { category, items } = data;
    const queryId = "SELECT (MAX(ID) + 1) AS ID FROM CATEGORIES";
    const [findedId] = await sequelize.query(queryId);
    const { id } = findedId[0];

    if (!items) {
      items = 0;
    }
    const query = "INSERT INTO CATEGORIES (ID, CATEGORY, ITEMS) VALUES (:id, :category, :items)";
    await sequelize.query(query, {
      replacements: {
        id: id,
        category: category,
        items: items
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
    const query = `UPDATE CATEGORIES SET ${datasQuery.join(", ")} WHERE ID = :id`;
    await sequelize.query(query, {
      replacements: updateData
    });
    return updateData;
  }


  async delete(id) {
    const query = "DELETE FROM CATEGORIES WHERE ID = :id";
    await sequelize.query(query, {
      replacements: {
        id: id
      }
    });
    return {
      id,
      message: "Category deleted"
    };
  }
}

module.exports = CategoriesService;
