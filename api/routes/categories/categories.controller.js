var categoryModel = require('./categories.model.js');

async function getAllCategories(req, res) {
    try {
        let allCategories = await categoryModel.getAll();
        res.json(allCategories);
    } catch (error) {
      // res.statusMessage=
      res.status(400).send(error.message);
    }
  }

async function addCategory(req, res) {
    try {
      let newCategory = req.body;
      await categoryModel.add(newCategory);
      res.end()
    } catch (error) {
      // res.statusMessage=
      res.status(400).send(error.message);
    }
  }
  async function getCategory (req, res) {
    try {
      let id = req.params.id
      let product = await categoryModel.getByID(id);
      res.json(category);
    } catch (error) {
      // res.statusMessage=
      res.status(400).send(error.message);
    }
  }

  async function updateCategory (req, res) {
    try {
      let id = parseInt(req.params.id)
      let category = req.body;
      await categoryModel.update(id, category);
      res.end();
    } catch (error) {
      // res.statusMessage=
      res.status(400).send(error.message);
    }
  }

  async function deleteCategory (req, res) {
    try {
      let id = parseInt(req.params.id)
      await categoryModel.remove(id);
      res.end();
    } catch (error) {
      // res.statusMessage=
      res.status(400).send(error.message);
    }
  }

  module.exports = {getAllCategories, addCategory, getCategory,updateCategory, deleteCategory};