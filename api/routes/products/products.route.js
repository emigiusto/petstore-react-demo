// index.js
var express = require('express');
//call all functions from product controller
var {getAllProducts, addProduct, getProduct,updateProduct, deleteProduct } = require('./products.controller.js');

const productRouter = express.Router();

// middleware specific to this route
productRouter.use(express.json())

// route handlers
productRouter.get("/", getAllProducts);
productRouter.get("/:id", getProduct);

productRouter.post("/", addProduct);

productRouter.put("/:id",updateProduct);

productRouter.delete("/:id", deleteProduct);

module.exports = productRouter;
