const Joi = require("joi");

const id = Joi.string();
const product = Joi.string().min(3).max(100);
const price = Joi.number().integer().min(10);
const stockNumber= Joi.number().integer().min(1);
const category = Joi.string().min(3);
// const image = Joi.string().uri();

const createProductSchema = Joi.object({
  product: product.required(),
  price: price.required(),
  stockNumber: stockNumber.required(),
  category
  // image: image.required(),
});

const updateProductSchema = Joi.object({
  product: product,
  price: price,
  stockNumber: stockNumber,
  category
  // image: image,
});


const getProductSchema = Joi.object({
  id: id.required(),
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema }
