const pool = require("../libs/postgresPool");

class ProductsService {

  constructor() {
    this.pool = pool;
    this.pool.on("error", (error) => console.error(error))
  }

  async getAll() {
    const query = "SELECT * FROM products";
    const products = await this.pool.query(query);
    return products.rows;
  }

  async getOne(id) {
    const query = "SELECT * FROM products where id =$1"
    const product = await this.pool.query(query, [id]);
    return product.rows;
  }

  async create(data) {
    let { product, price } = data;
    const queryId = "SELECT (MAX(ID) + 1) AS ID FROM PRODUCTS";
    const { rows } = await this.pool.query(queryId);

    const values = [rows[0].id, product, price];
    const query = "INSERT INTO PRODUCTS (ID, PRODUCT, PRICE) VALUES ($1, $2, $3)";
    await this.pool.query(query, values);

    return {
      id: rows[0].id,
      ...data
    };
  }

  async update(id, changes) {
    const dataUpdate = [];
    const setQuery = [];
    Object.entries(changes).forEach((entrie, index) => {
      setQuery.push(entrie[0] + ` = $${index + 1}`);
      dataUpdate.push(entrie[1]);
    });

    const query = `UPDATE PRODUCTS SET ${setQuery.join(", ")} WHERE ID = ${id}`;
    await this.pool.query(query, dataUpdate);

    return {
      id,
      ...changes
    };
  }

  async delete(id) {
    const query = "DELETE FROM PRODUCTS WHERE ID =$1";
    await this.pool.query(query, [id]);
    return {
      id,
      message: "Product deleted"
    };
  }
}

module.exports = ProductsService;
