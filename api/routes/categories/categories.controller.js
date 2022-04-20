var categoryModel = require('./categories.model.js');

async function getAllCategories(req, res) {
    try {
        let allCategories = await categoryModel.getAll();
        res.json(allCategories);
    } catch (message) {
      res.status(400).send({message:message});
    }
  }

async function addCategory(req, res) {
  try {
    let newCategory = {
      options: req.body.options,
      value: req.body.value,
      description: req.body.description,
      activated: req.body.activated ? req.body.activated : false
    };
    if (newCategory.options && newCategory.value && newCategory.description) {
      let responseID = await categoryModel.add(newCategory);
      res.json(responseID.message);
    } else {
      throw "Cannot add Category as it is missing required fields.";
    }
  } catch (message) {
    res.status(400).send({message: message});
  }
}

  async function getCategory(req, res) {
    try {
      let id = req.params.id;
      let category = await categoryModel.getByID(id);
      if (category.categoryExists) {
        res.json(category.finalCategory);
      } else {
        throw category.message;
      }
    } catch (message) {
      res.status(400).send({message: message});
    }
  }

  async function updateCategory (req, res) {
    try {
      let id = req.params.id;
      let body = req.body;
      let bodyValidated = {};
      if (body.activated) {
        bodyValidated.activated = body.activated;
      }
      if (body.description) {
        bodyValidated.description = body.description;
      }
      if (body.options) {
        bodyValidated.options = body.options;
      }
      if (body.value) {
        bodyValidated.value = body.value;
      }
  
      let category = await categoryModel.getByID(id);
      if (category.categoryExists) {
        let responseMessage = await categoryModel.update(id, bodyValidated);
        if (responseMessage.status) {
          res.json(responseMessage.message);
        } else {
          throw responseMessage.message;
        }
      } else {
        throw "Category does not exist";
      }
    } catch (message) {
      res.status(400).send({message: message});
    }
  }

  async function deleteCategory (req, res) {
    try {
      let id = req.params.id;
      let responseMessage = await categoryModel.remove(id);
  
      if (responseMessage.status) {
        res.json(responseMessage.message);
      } else {
        throw responseMessage.message;
      }
    } catch (message) {
      res.status(400).send({message: message});
    }
  }

  module.exports = {getAllCategories, addCategory, getCategory,updateCategory, deleteCategory};