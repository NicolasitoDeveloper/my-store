const express = require('express');
const CategoriesService = require("./../services/categoriesServices");
const validatorHandler = require("./../middlewares/validatorHandler");
const { createCategorySchema, updateCategorySchema, getCategorySchema } = require("./../schemas-DTO data tranfer object/categorySchema");

const router = express.Router();
const service = new CategoriesService();

router.get("/", async (req, res) => {
  const categories = await service.getAll();
  res.json(categories);
});

router.get("/:id",
  validatorHandler(getCategorySchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await service.getOne(id);
      res.json(category);
    } catch (error) {
      next(error);
    }
  });

router.post("/",
  validatorHandler(createCategorySchema, "body"),
  async (req, res) => {
    const body = req.body;
    const newCategory = await service.create(body);
    res.status(201).json(newCategory);
  });

router.patch("/:id",
  validatorHandler(getCategorySchema, "params"),
  validatorHandler(updateCategorySchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const category = await service.update(id, body);
      res.json(category);
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
