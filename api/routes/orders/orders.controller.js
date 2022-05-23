var orderModel = require("./orders.model.js");
var productModel = require("../products/products.model");
var usersModel = require("../users/users.model");

// Return all orders from database
async function getAllOrders(req, res) {
  try {
    let allOrders = await orderModel.getAll();
    res.json(allOrders);
  } catch (error) {
    res.status(400).send({message: error.message});
  }
}

// update existing order
async function updateOrder(req, res) {
  try {
    let id = req.params.id;
    let body = req.body;
    let bodyValidated = {};
    if (body.address) {
      bodyValidated.address = body.address;
    }
    if (body.items) {
      bodyValidated.items = body.items;
    }
    if (body.status) {
      bodyValidated.status = body.status;
    }
    if (body.userid) {
      bodyValidated.userid = body.userid;
    }

    let order = await orderModel.getByID(id);
    if (order.orderExists) {
      let responseMessage = await orderModel.update(id, bodyValidated);
      if (responseMessage.status) {
        res.json({message:responseMessage.message});
      } else {
        throw responseMessage.message;
      }
    } else {
      throw "Order does not exist";
    }
  } catch (message) {
    res.status(400).send({message:message});
  }
}

// Add order to database
async function addOrder(req, res) {
  try {
    let userID = req.body.userid
    //Checks if user exists
    let user = await usersModel.getByID(userID)
    if (!user.userExists) {
      throw 'User does not exist';
    }
    //New order template
    let newOrder = {
      address: req.body.address,
      items: req.body.items.length ? req.body.items : [],
      userid: userID,
      status: "in progress",
    };
    if (newOrder.address) {
      //Close all open orders so there is only one in progress
      await orderModel.closeOpenOrders(userID)
      //Adds the new order with status "in progress"
      let responseID = await orderModel.add(newOrder);
      res.status(201).send({id:responseID.message});
    } else {
      throw "Cannot add order as it is missing required fields.";
    }
  } catch (message) {
    res.status(400).send({message:message});
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
    res.status(400).send({message:message});
  }
}

// Delete existing order
async function deleteOrder(req, res) {
  try {
    let id = req.params.id;
    let responseMessage = await orderModel.remove(id);

    if (responseMessage.status) {
      res.json({message:responseMessage.message});
    } else {
      throwres.json({message:responseMessage.message});
    }
  } catch (message) {
    res.status(400).send({message:message});
  }
}

// Change a product in an order
async function changeOrder(req, res) {
  try {
    let orderid = req.params.orderid;
    let productid = req.params.productid;
    //Validations
      //Checks if the product exists
      let productResponse = await productModel.getByID(productid);
      if (!productResponse.productExists) {
        throw "Product does not exist"
      }
      //Checks if the order exists
      let responseOrder = await orderModel.getByID(orderid);
      
      if (!responseOrder.orderExists) {
        throw responseOrder.message;
      }
      //Checks if the order has status in progress
      let inProgress = responseOrder.finalOrder.status == "in progress";
      if (inProgress) {
        switch (req.body.action) {
          case "increase":
              await updateProductFromOrder(responseOrder.finalOrder, productid, "increase")
              res.json(
                {
                  message: "product with id " + productid + " has been added to order " + orderid,
                  status: true});
            break;
          case "decrease":
              await updateProductFromOrder(responseOrder.finalOrder, productid, "decrease")
              res.json({  message: "the quantity of product with id " + productid + " has been reduced from order " + orderid,
                          status: true});
            break;
          case "remove":
              await updateProductFromOrder(responseOrder.finalOrder, productid, "remove")
              res.json({  message: "The product with id " + productid + " has been deleted from order " + orderid,
                          status: true}); 
            break;
          default:
            throw "Action not recognized"
        }
      } else { 
        switch (body.action) {
          case "increase": //The order is not in progress --> create a new one
              let newOrder = {
                address: "",
                items: [{productid:productResponse.finalProd.id, quantity:1}],
                userid: responseOrder.finalOrder.userid ? responseOrder.finalOrder.userid : "",
                status: "in progress",
              };
              let responseID = await orderModel.add(newOrder);
              res.json({message: responseID.message});
            break;
          case "decrease":
              throw "Can't decrease product quantity from an order that isn't in progress"
          case "remove":
              throw "Can't remove product from an order that isn't in progress"
          default:
            throw "Action not recognized"
        }
      }
  } catch (message) {
    res.status(400).send({message: message, status: false});
  }
}

async function getShoppingBasket(req, res) {
  //Checks if the user has an order "Open" and returns it, if there is none, creates one and returns it
  try {
    //Checks if the user has an order
    let userid = req.params.userid;
    let user = await usersModel.getByID(userid)
    if (!user.userExists) {
      throw 'User does not exist';
    }
    let order = await orderModel.getShoppingBasket(user.finalUser);
    res.json(order);
  } catch (message) {
    res.status(400).send({message:message});
  }
}

async function clearBasket(req, res) {
  //Clears the basket if there is one order "in progress"
  try {
    //Checks if the user has an order
    let userid = req.params.userid;
    let user = await usersModel.getByID(userid)
    if (!user.userExists) {
      throw 'User does not exist';
    }
    let order = await orderModel.getShoppingBasket(user.finalUser);

    await orderModel.update(order.id, {items: []});

    res.json({message: "The basket of user with id " + userid + " has been cleared"});
  } catch (message) {
    res.status(400).send({message:message});
  }
}

async function getOrdersByUser(req, res) {
  try {
    //Checks if the user has an order
    let userid = req.params.userid;
    let user = await usersModel.getByID(userid)
    if (!user.userExists) {
      throw 'User does not exist';
    }
    let ordersArray = await orderModel.getOrdersByUser(userid)
      res.json(ordersArray);
  } catch (message) {
    res.status(400).send({message:message});
  }
}

module.exports = {  getAllOrders, 
                    addOrder, 
                    getOrder, 
                    deleteOrder, 
                    updateOrder, 
                    getShoppingBasket,
                    getOrdersByUser,
                    clearBasket,
                    changeOrder
                  };

function isProductOnOrder(order, productId) {
  return order.items.some((product) => product.productid == productId)
}

async function updateProductFromOrder(order, productId, operation) {
  let modifiedItems = {
    items: []
  }
  if (operation == "increase") {
        if (isProductOnOrder(order,productId)) { //product is already in order
          let updatedProduct = order.items.filter(product => product.productid == productId)[0]
          updatedProduct.quantity++
          modifiedItems.items = order.items.filter(product => !(product.productid == productId))
          modifiedItems.items.push(updatedProduct)
        } else { //product is not in order
          modifiedItems.items = order.items.filter(product => !(product.productid == productId)) 
          order.items.push({ productid: productId, quantity: 1})
          modifiedItems.items = order.items
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