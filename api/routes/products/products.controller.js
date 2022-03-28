var productModel = require('./products.model.js');

async function getAllProducts(req, res) {
    try {
        let allProducts = await productModel.getAll();
        res.json(allProducts);
    } catch (error) {
      // res.statusMessage=
      res.status(400).send(error.message);
    }
  }

async function addProduct(req, res) {
    try {
      let newProduct = req.body;
      await productModel.add(newProduct);
      res.end()
    } catch (error) {
      // res.statusMessage=
      res.status(400).send(error.message);
    }
  }
  async function getProduct (req, res) {
    try {
      let id = req.params.id
      let product = await productModel.getByID(id);
      res.json(product);
    } catch (error) {
      // res.statusMessage=
      res.status(400).send(error.message);
    }
  }

  async function updateProduct (req, res) {
    try {
      let id = parseInt(req.params.id)
      let product = req.body;
      await productModel.update(id, product);
      res.end();
    } catch (error) {
      // res.statusMessage=
      res.status(400).send(error.message);
    }
  }

  async function deleteProduct (req, res) {
    try {
      let id = parseInt(req.params.id)
      await productModel.remove(id);
      res.end();
    } catch (error) {
      // res.statusMessage=
      res.status(400).send(error.message);
    }
  }

  module.exports = {getAllProducts, addProduct, getProduct,updateProduct, deleteProduct};