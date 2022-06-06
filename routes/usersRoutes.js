const express = require('express');
const UsersService = require("./../services/usersServices");
const validatorHandler = require("./../middlewares/validatorHandler");
const { createUserSchema, updateUserSchema, getUserSchema } = require("./../schemas-DTO data tranfer object/userSchema");

const router = express.Router();
const service = new UsersService();

router.get("/", async (req, res, next) => {
  try {
    const users = await service.getAll();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get("/:id",
  validatorHandler(getUserSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await service.getOne(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  });

router.post("/",
  validatorHandler(createUserSchema, "body"),
  async (req, res) => {
    const body = req.body;
    const newUser = await service.create(body);
    res.status(201).json(newUser);
  });

router.patch("/:id",
  validatorHandler(getUserSchema, "params"),
  validatorHandler(updateUserSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const user = await service.update(id, body);
      res.json(user);
    } catch (error) {
      next(error);
    }
  });

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const resp = await service.delete(id);
    res.json(resp);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
