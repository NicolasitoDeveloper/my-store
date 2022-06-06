const Joi = require("joi");

const id = Joi.string();
const username = Joi.string().min(2).max(200);
const lastname = Joi.string().min(2).max(200);
const firstname = Joi.string().min(2).max(200);
const email = Joi.string().email();
const city = Joi.string()

const createUserSchema = Joi.object({
  username: username.required(),
  lastname: lastname.required(),
  firstname: firstname.required(),
  email: email.required(),
  city,
});

const updateUserSchema = Joi.object({
  username: username,
  lastname: lastname,
  firstname: firstname,
  email: email,
  city: city
});


const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema }
