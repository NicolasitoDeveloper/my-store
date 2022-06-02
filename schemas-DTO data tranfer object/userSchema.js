const Joi = require("joi");

const id = Joi.string().uuid();
const name = Joi.string().min(2).max(20);
const lastName = Joi.string().min(2).max(20);
const email = Joi.string().email();
const avatar = Joi.string().uri();
const city = Joi.string()

const createUserSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  email: email.required(),
  avatar,
  city,
});

const updateUserSchema = Joi.object({
  name: name,
  lastName: lastName,
  email: email,
  avatar: avatar,
  city: city
});


const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema }
