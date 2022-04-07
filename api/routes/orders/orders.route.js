// index.js
var express = require('express');
//call all functions from orders controller
var {getAllOrders, addOrder, getOrder,updateOrder, deleteOrder } = require('./orders.controller.js');

const orderRouter = express.Router();

// middleware specific to this route
orderRouter.use(express.json())

// route handlers
orderRouter.get("/", getAllOrders);
orderRouter.get("/:id", getOrder);

orderRouter.post("/", addOrder);

orderRouter.put("/:id",updateOrder);

orderRouter.delete("/:id", deleteOrder);

module.exports = orderRouter;
