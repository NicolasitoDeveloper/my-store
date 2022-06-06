const {Model, DataTypes, Sequelize} = require("sequelize");

const USER_TABLE = "users";

const UserSchema = {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },

  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },

  username: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },

  lastname: {
    allowNull: false,
    type: DataTypes.STRING,
  },

  firstname: {
    allowNull: false,
    type: DataTypes.STRING,
  },

  city: {
    allowNull: false,
    type: DataTypes.STRING,
  },

  password: {
    allowNull: false,
    type: DataTypes.STRING
  },

  createdAt: {
    allowNull:false,
    type: DataTypes.DATE,
    field: "create_at",
    defaultValue: Sequelize.NOW
  }
}

class User extends Model {
  static associate() {
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: "User",
      timestamps: false
    }
  }
}

module.exports = { USER_TABLE, UserSchema, User }
