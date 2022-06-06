const { QueryTypes } = require("sequelize/types");
const sequelize = require("../libs/sequelize");

class ProductsService {

  constructor() {
  }

  async getAll() {
    const query = "SELECT * FROM products";
    const [data] = await sequelize.query(query);
    return {
      data
    };
  }

  async getOne(id) {
    const query = "SELECT * FROM products where id = ?"
    const [data] = await sequelize.query(query, {
      replacements: [id],
      type: QueryTypes.SELECT
    }
    );
    return data;
  }

  async create(data) {
    let { product, price } = data;
    const queryId = "SELECT (MAX(ID) + 1) AS ID FROM PRODUCTS";
    const [findedId] = await sequelize.query(queryId);
    const { id } = findedId[0];

    const query = "INSERT INTO PRODUCTS (ID, PRODUCT, PRICE) VALUES (:id, :product, :price)";
    await sequelize.query(query, {
      replacements: {
        id: id,
        product: product,
        price: price
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
    const query = `UPDATE PRODUCTS SET ${datasQuery.join(", ")} WHERE ID = :id`;
    await sequelize.query(query, {
      replacements: updateData
    });
    return updateData;
  }

  async delete(id) {
    const query = "DELETE FROM PRODUCTS WHERE ID = :id";
    await sequelize.query(query, {
      replacements: {
        id: id
      }
    });
    return {
      id,
      message: "Product deleted"
    };
  }
}

module.exports = ProductsService;
