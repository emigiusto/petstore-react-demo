var productModel = require('./products.model.js');
var categoryModel = require('../categories/categories.model');

async function getAllProducts(req, res) {
    try {
        let allProducts = await productModel.getAll();
        res.json({products: allProducts});
    } catch (message) {
      res.status(400).send({message: message});
    }
  }

async function addProduct(req, res) {
    try {
      let newProduct = {
        arrival: req.body.arrival ? req.body.arrival : false,
        breed: req.body.breed,
        delivery: req.body.delivery ? req.body.delivery : false,
        description: req.body.description ? req.body.description : "",
        image: req.body.image,
        offer: req.body.offer ? req.body.offer : false,
        package: req.body.package ? req.body.package : "",
        price: req.body.price,
        size: req.body.size,
        sterilized: req.body.sterilized ? req.body.sterilized : false,
        stock: req.body.stock ? req.body.stock : 0,
        title: req.body.title,
        vendor: req.body.vendor,
        type: req.body.type,
      };
      if (newProduct.breed && newProduct.image && typeof newProduct.offer !== 'undefined' && typeof newProduct.sterilized !== 'undefined' && newProduct.type) {
        let responseID = await productModel.add(newProduct);
        res.json({id:responseID.message})
      } else {
        let errorMessage = {
          message: "Cannot add product as some fields are missing."
        }
        throw errorMessage.message
      }
    } catch (message) {
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
          res.json({message: responseMessage.message})
        } else {
          throw responseMessage.message
        }
      } else {
        throw "Product does not exist"
      }

    } catch (message) {
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
      res.status(400).send({message: message});
    }
  }

  async function getProductsByCategory (req, res) {
    try {
      let categoryName = req.params.categoryName
      let allCategories = await categoryModel.getAll()
      let typeCategory = allCategories.filter((category) => category.value.toLowerCase() == "type")
      if (!typeCategory.options.some((option) => option == categoryName)) {
        throw "Category does not exist."
      }
      /*  category = {
        options:["Cat food","Dog Food", "Fish Food"],
        value: "Type",
        id: "",
      } */
      let allProductsResponse = await productModel.getAll()
      let filteredProducts = allProductsResponse.filter((product) => product.type = categoryName)
      res.json({products: filteredProducts})
    } catch (message) {
      res.status(400).send({message: message});
    }
  }

  module.exports = {getAllProducts, addProduct, getProduct,updateProduct, deleteProduct, getProductsByCategory};