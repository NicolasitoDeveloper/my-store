const pool = require("../libs/postgresPool");

class CategoriesService {

  constructor() {
    this.pool = pool;
    this.pool.on("error", (error) => console.error(error))
  }

  async getAll() {
    const query = "SELECT * FROM categories";
    const categories = await this.pool.query(query);
    return categories.rows;
  }

  async getOne(id) {
    const query = "SELECT * FROM categories where id =$1"
    const category = await this.pool.query(query, [id]);
    return category.rows
  }

  async create(data) {
    let { category, items } = data;
    const queryId = "SELECT (MAX(ID) + 1) AS ID FROM CATEGORIES";
    const { rows } = await this.pool.query(queryId);

    if (!items) {
      items = 0;
    }
    const values = [rows[0].id, category, items];
    const query = "INSERT INTO CATEGORIES (ID, CATEGORY, ITEMS) VALUES ($1, $2, $3)";
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

    const query = `UPDATE CATEGORIES SET ${setQuery.join(", ")} WHERE ID = ${id}`;
    await this.pool.query(query, dataUpdate);

    return {
      id,
      ...changes
    };
  }

  async delete(id) {
    const query = "DELETE FROM CATEGORIES WHERE ID =$1";
    await this.pool.query(query, [id]);
    return {
      id,
      message: "Category deleted"
    };
  }
}

module.exports = CategoriesService;
