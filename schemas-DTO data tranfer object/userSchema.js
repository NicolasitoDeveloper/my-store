const Joi = require("joi");

const id = Joi.string();
const username = Joi.string().min(2).max(200);
const lastname = Joi.string().min(2).max(200);
const firstname = Joi.string().min(2).max(200);
const email = Joi.string().email();
const password = Joi.string().min(8);
const city = Joi.string()
// const role= Joi.string.min(5);

const createUserSchema = Joi.object({
  username: username.required(),
  lastname: lastname.required(),
  firstname: firstname.required(),
  email: email.required(),
  password: password.required(),
  city,
  // role: role.required(),
});

const updateUserSchema = Joi.object({
  username: username,
  lastname: lastname,
  firstname: firstname,
  email: email,
  password: password,
  city: city,
  // role: role,
});


const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema }
