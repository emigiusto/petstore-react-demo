var orderModel = require("./orders.model.js");
var productModel = require("../products/products.model");

// Return all orders from database
async function getAllOrders(req, res) {
  try {
    let allOrders = await orderModel.getAll();
    res.json(allOrders);
  } catch (error) {
    // res.statusMessage=
    res.status(400).send(error.message);
  }
}

// update existing order
async function updateOrder(req, res) {
  try {
    let id = req.params.id;
    let body = req.body;
    let bodyValidaded = {};
    if (body.address) {
      bodyValidaded.address = body.address;
    }
    if (body.items) {
      bodyValidaded.items = body.items;
    }
    if (body.status) {
      bodyValidaded.status = body.status;
    }
    if (body.userid) {
      bodyValidaded.street = body.userid;
    }

    let order = await orderModel.getByID(id);
    if (order.orderExists) {
      let responseMessage = await orderModel.update(id, bodyValidaded);
      if (responseMessage.status) {
        res.json(responseMessage.message);
      } else {
        throw responseMessage.message;
      }
    } else {
      throw "Order does not exist";
    }
  } catch (message) {
    // res.statusMessage=
    res.status(400).send(message);
  }
}

// Add order to database
async function addOrder(req, res) {
  try {
    let newOrder = {
      address: req.body.address,
      items: req.body.items,
      userid: req.body.userid,
      status: "in progress",
    };
    if (newOrder.address && newOrder.items && newOrder.userid) {
      let responseID = await orderModel.add(newOrder);
      res.json(responseID.message);
    } else {
      let errorResponse = {
        message: "Cannot add order as it is missing required fields.",
      };
      throw errorResponse.message;
    }
  } catch (message) {
    res.status(400).send(message);
  }
}

// Return a single order by ID
async function getOrder(req, res) {
  try {
    let id = req.params.id;
    let order = await orderModel.getByID(id);
    if (order.orderExists) {
      res.json(order.finalOrder);
    } else {
      throw order.message;
    }
  } catch (message) {

    res.status(400).send(message);
  }
}

// Delete existing order
async function deleteOrder(req, res) {
  try {
    let id = req.params.id;
    let responseMessage = await orderModel.remove(id);

    if (responseMessage.status) {
      res.json(responseMessage.message);
    } else {
      throw responseMessage.message;
    }
  } catch (message) {
    // res.statusMessage=
    res.status(400).send(message);
  }
}

// IncreaseProduct to order
async function increaseProduct(req, res) {
  try {
    let id = req.params.orderid;
    let body = req.body;
    //Checks if the product exists
    let productId = body.productId;
    let productResponse = await productModel.getByID(productId);
    if (!productResponse.productExists) {
      throw responseMessage.message;
    }
    //Handles update of Order
    let responseOrder = await orderModel.getByID(id);
    if (responseOrder.orderExists && responseOrder.finalOrder.status =='in progress') {
      await updateProductFromOrder(responseOrder.finalOrder, productId, "increase")
      res.json({message: "product with id " + productId + " has been added to order " + id});
    } else {
      let newOrder = {
        address: body.address ? body.address : "",
        items: [body.product],
        userid: req.body.userid ? body.userid : "",
        status: "in progress",
      };
      let responseID = await orderModel.add(newOrder);
      res.json({message: responseID.message});
    }
  } catch (message) {
    res.status(400).send({message: message});
  }
}

// Decrease Product quantityfrom order
async function decreaseProduct(req, res) {
  try {
    
    let id = req.params.orderid;
    let body = req.body;
    //Checks if the product exists
    let productId = body.productId;
    let productResponse = await productModel.getByID(productId);
    if (!productResponse.productExists) {
      throw productResponse.message;
    }
    
    //Checks if the order exists
    let responseOrder = await orderModel.getByID(id);
    if (!responseOrder.orderExists) {
      throw responseOrder.message;
    }

    //Handles update of Order
    if (responseOrder.orderExists && responseOrder.finalOrder.status =='in progress') {
      await updateProductFromOrder(responseOrder.finalOrder, productId, "decrease")
      res.json({message: "the quantity of product with id " + productId + " has been reduced from order " + id});
    }
  } catch (message) {
    res.status(400).send({message: message});
  }
}

async function removeProductFromOrder(req, res) {
  try {
    let id = req.params.orderid;
    let body = req.body;
    //Checks if the product exists
    let productId = body.productId;
    let productResponse = await productModel.getByID(productId);
    if (!productResponse.productExists) {
      throw productResponse.message;
    }
    
    //Checks if the order exists
    let responseOrder = await orderModel.getByID(id);
    if (!responseOrder.orderExists) {
      throw responseOrder.message;
    }
    //Handles update of Order
    if (responseOrder.orderExists && responseOrder.finalOrder.status =='in progress') {
      await updateProductFromOrder(responseOrder.finalOrder, productId, "remove")
      res.json({message: "The product with id " + productId + " has been deleted from order " + id});
    }
  } catch (message) {
    res.status(400).send({message: message});
  }
}

module.exports = { getAllOrders, addOrder, getOrder, deleteOrder, updateOrder, increaseProduct, decreaseProduct, removeProductFromOrder};

function isProductOnOrder(order, productId) {
  return order.items.some((product) => product.productid == productId)
}

async function updateProductFromOrder(order, productId, operation) {
  let modifiedItems = {}
  if (operation == "increase") {
        if (isProductOnOrder(order,productId)) {
          let updatedProduct = order.items.filter(product => product.productid == productId)[0]
          updatedProduct.quantity++
          modifiedItems.items = order.items.filter(product => !(product.productid == productId))
          modifiedItems.items.push(updatedProduct)
        } else {
          modifiedItems.items = order.items.push({ productid: productId, quantity: 1})
        }
  } else if (operation == "decrease") {
        if (isProductOnOrder(order,productId)) {
          let updatedProduct = order.items.filter(product => product.productid == productId)[0]
              modifiedItems.items = order.items.filter(product => !(product.productid == productId))
              if (updatedProduct.quantity > 1) {
                updatedProduct.quantity--
                modifiedItems.items.push(updatedProduct)
              }
        } else {
          throw "Product " + productId + " is not on the order "  + order.id;
        }
  } else if (operation == "remove"){
      if (isProductOnOrder(order,productId)) {
          modifiedItems.items = order.items.filter(product => !(product.productid == productId))
      } else {
        throw "Product " + productId + " is not on the order "  + order.id;
      }
  }
  await orderModel.update(order.id, modifiedItems);
}