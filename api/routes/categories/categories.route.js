// index.js
var express = require('express');
//call all functions from categories controller
var {getAllCategories, addCategory, getCategory,updateCategory, deleteCategory } = require('./categories.controller.js');

const categoryRouter = express.Router();

// middleware specific to this route
categoryRouter.use(express.json())

// route handlers

categoryRouter.get("/:id", getCategory);
categoryRouter.get("/", getAllCategories);

categoryRouter.post("/", addCategory);

categoryRouter.put("/:id",updateCategory);

categoryRouter.delete("/:id", deleteCategory);

module.exports = categoryRouter;
