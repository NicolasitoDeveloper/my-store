const {Model, DataTypes, Sequelize} = require("sequelize");

const PRODUCT_TABLE = "products";

const ProductSchema = {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },

  product: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
    field: "product_name"
  },

  price: {
    allowNull: false,
    type: DataTypes.REAL,
  },

  stockNumber: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: "stock_number"
  },

  category: {
    allowNull: true,
    type: DataTypes.STRING,
    field: "category"
  },


  createdAt: {
    allowNull:false,
    type: DataTypes.DATE,
    field: "create_at",
    defaultValue: Sequelize.NOW
  }
}

class Product extends Model {
  static associate() {
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: "Product",
      timestamps: false
    }
  }
}

module.exports = { PRODUCT_TABLE, ProductSchema, Product }
