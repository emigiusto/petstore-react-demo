var orderModel = require("./orders.model.js");

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
    console.log(body);
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
    // res.statusMessage=
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
    // res.statusMessage=
    console.log(message);
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

module.exports = { getAllOrders, addOrder, getOrder, deleteOrder, updateOrder };
