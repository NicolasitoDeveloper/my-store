const Joi = require("joi");

const id = Joi.string();
const category = Joi.string().min(3).max(250);
const items = Joi.string().min(3).max(250);

const createCategorySchema = Joi.object({
  category: category.required(),
  items: items.required()
});

const updateCategorySchema = Joi.object({
  category: category,
  items: items
});


const getCategorySchema = Joi.object({
  id: id.required(),
});

module.exports = { createCategorySchema, updateCategorySchema, getCategorySchema }
