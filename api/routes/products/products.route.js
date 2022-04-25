// index.js
var express = require('express');
//call all functions from product controller
var {getAllProducts, addProduct, getProduct,updateProduct, deleteProduct, getProductsByCategory} = require('./products.controller.js');

const productRouter = express.Router();

// middleware specific to this route
productRouter.use(express.json())

// route handlers
productRouter.get("/", getAllProducts);

productRouter.get("/:id", getProduct);

productRouter.get("/category/:optionName", getProductsByCategory);

productRouter.post("/", addProduct);

productRouter.put("/:id",updateProduct);

productRouter.delete("/:id", deleteProduct);

module.exports = productRouter;
