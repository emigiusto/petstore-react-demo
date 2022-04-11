var productModel = require('./products.model.js');

async function getAllProducts(req, res) {
    try {
        let allProducts = await productModel.getAll();
        res.json({products: allProducts});
    } catch (error) {
      // res.statusMessage=
      res.status(400).send({message:error.message});
    }
  }

async function addProduct(req, res) {
    try {
      let newProduct = {
        arrival: req.body.arrival,
        breed: req.body.breed,
        delivery: req.body.delivery,
        description: req.body.description,
        image: req.body.image,
        offer: req.body.offer,
        package: req.body.package,
        price: req.body.price,
        size: req.body.size,
        sterilized: req.body.sterilized,
        stock: req.body.stock,
        title: req.body.title,
        type: req.body.type,
        vendor: req.body.vendor
      };
      if (newProduct.breed && newProduct.image && newProduct.offer && newProduct.price && newProduct.sterilized && newProduct.type) {
        let responseID = await productModel.add(newProduct);
        res.json({id:responseID.message})
      } else {
        let errorMessage = {
          message: "Cannot add product as some fields are missing."
        }
        throw errorMessage.message
      }
    } catch (message) {
      // res.statusMessage=
      res.status(400).send({message: message});
    }
  }


  async function getProduct (req, res) {
    try {
      let id = req.params.id
      let product = await productModel.getByID(id);

      if (product.productExists) {
        res.json(product.finalProd)
      } else {
        throw product.message
      }

    } catch (message) {
      // res.statusMessage=
      res.status(400).send({message: message});
    }
  }

  async function updateProduct (req, res) {
    try {
      let id = req.params.id
      let body = req.body
      let bodyValidated = {}
      if (body.arrival) { bodyValidated.arrival = body.arrival }
      if (body.breed) { bodyValidated.breed = body.breed }
      if (body.delivery) { bodyValidated.delivery = body.delivery }
      if (body.description) { bodyValidated.description = body.description }
      if (body.image) { bodyValidated.image = body.image }
      if (body.offer) { bodyValidated.offer = body.offer }
      if (body.package) { bodyValidated.package = body.package }
      if (body.price) { bodyValidated.price = body.price }
      if (body.size) { bodyValidated.size = body.size }
      if (body.sterilized) { bodyValidated.sterilized = body.sterilized }
      if (body.stock) { bodyValidated.stock = body.stock }
      if (body.title) { bodyValidated.title = body.title }
      if (body.type) { bodyValidated.type = body.type }
      if (body.vendor) { bodyValidated.vendor = body.vendor }

      let product = await productModel.getByID(id)

      if (product.productExists) {
        let responseMessage = await productModel.update(id, bodyValidated);
        if (responseMessage.status) {
          res.json(responseMessage.message)
        } else {
          throw responseMessage.message
        }
      } else {
        throw "Product does not exist"
      }

    } catch (message) {
      // res.statusMessage=
      res.status(400).send({message: message});
    }
  }

  async function deleteProduct (req, res) {
    try {
      let id = req.params.id
      let responseMessage = await productModel.remove(id)

      if (responseMessage.status) {
        res.json({message: responseMessage.message})
      } else {
        throw responseMessage.message
      }

    } catch (message) {
      // res.statusMessage=
      res.status(400).send({message: message});
    }
  }

  module.exports = {getAllProducts, addProduct, getProduct,updateProduct, deleteProduct};