const pool = require("../libs/postgresPool");

class UsersService {

  constructor() {
    this.pool = pool;
    this.pool.on("error", (error) => console.error(error))
  }

  async getAll() {
    const query = "SELECT * FROM users";
    const users = await this.pool.query(query);
    return users.rows;
  }

  async getOne(id) {
    const query = "SELECT * FROM users where id =$1"
    const user = await this.pool.query(query, [id]);
    return user.rows;
  }

  async create(data) {
    let { username, lastname, firstname, email, city } = data;
    const queryId = "SELECT (MAX(ID) + 1) AS ID FROM USERS";
    const { rows } = await this.pool.query(queryId);

    const values = [rows[0].id,  username, lastname, firstname, email, city];
    const query = "INSERT INTO USERS (ID, USERNAME, LASTNAME, FIRSTNAME, EMAIL, CITY) VALUES ($1, $2, $3, $4, $5, $6)";
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

    const query = `UPDATE USERS SET ${setQuery.join(", ")} WHERE ID = ${id}`;
    await this.pool.query(query, dataUpdate);

    return {
      id,
      ...changes
    };
  }

  async delete(id) {
    const query = "DELETE FROM USERS WHERE ID =$1";
    await this.pool.query(query, [id]);
    return {
      id,
      message: "User deleted"
    };
  }

}

module.exports = UsersService;
