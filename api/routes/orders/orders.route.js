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
  removeProductFromOrder,
  getShoppingBasket,
  getOrdersByUser,
  clearBasket,
  changeOrder
} = require("./orders.controller.js");

const orderRouter = express.Router();

// middleware specific to this route
orderRouter.use(express.json());

// route handlers

//get all orders
orderRouter.get("/", getAllOrders);
//get a single order by id
orderRouter.get("/:id", getOrder);
//get open order
orderRouter.get("/basket/:userid", getShoppingBasket);

//Clear cart by userid
orderRouter.put("/clearbasket/:userid", clearBasket);
//get order by user
orderRouter.get("/user/:userid", getOrdersByUser);

//add a new order / CART?
orderRouter.post("/", addOrder);

//update an existing order or create it, if it does not exist
orderRouter.put("/:id", updateOrder);

//delete an order
orderRouter.delete("/:id", deleteOrder);

//Basic Operations on order: Remove product, Increase product by 1, Decrease product by 1
orderRouter.put("/:orderid/product/:productid", changeOrder);




module.exports = orderRouter;
