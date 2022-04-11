// index.js
var express = require("express");
//call all functions from orders controller
var {
  getAllOrders,
  addOrder,
  getOrder,
  updateOrder,
  deleteOrder,
  increaseProduct,
  decreaseProduct,
  removeProductFromOrder
} = require("./orders.controller.js");

const orderRouter = express.Router();

// middleware specific to this route
orderRouter.use(express.json());

// route handlers

//get all orders
orderRouter.get("/", getAllOrders);
//get a single order by id
orderRouter.get("/:id", getOrder);

//add a new order
orderRouter.post("/", addOrder);

//update an existing order or create it, if it does not exist
orderRouter.put("/:id", updateOrder);

//delete an order
orderRouter.delete("/:id", deleteOrder);

//increaseProduct from order
orderRouter.put("/increaseproduct/:orderid", increaseProduct);
//decreaseProduct from order
orderRouter.put("/decreaseproduct/:orderid", decreaseProduct);

//remove Product from order
orderRouter.put("/removeproduct/:orderid", removeProductFromOrder);

module.exports = orderRouter;
