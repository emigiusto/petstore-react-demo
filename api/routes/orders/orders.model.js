const { status } = require("express/lib/response");
var db = require("../../dba/firestore");

// Return all orders from database
// Tested successfully
async function getAll() {
  try {
    const orders = [];
    const orderCollection = db.collection("orders");
    const snapshot = await orderCollection.get();
    snapshot.forEach((doc) => {
      orders.push({
        ...doc.data(),
        id: doc.id,
      });
    });
    return orders;
  } catch (err) {
    throw err.message;
  }
}

// Return a single order by ID
//Tested successfully
async function getByID(orderID) {
  try {
    // Get order with ID from database
    const order = await db.collection("orders").doc(orderID).get();
    // Create a response message with order data
    var response = {
      message: "",
      orderExists: true,
      // Array based on orderID
      finalOrder: {
        id: order.id,
        ...order.data(),
      },
    };
    // If the order does not exist set response to error message
    if (!order.data()) {
      response.message = `Order with ID: ${orderID} doesn't exist`;
      response.orderExists = false;
    }
    // return response
    return response;
  } catch (err) {
    throw err.message;
  }
}

// Add order to database
//Tested successfully
async function add(newOrder) {
  // Create object for response message
  try {
    var response = {
      message: "",
    };
    // Add new order and return response message containing the new orderID
    const orders = db
      .collection("orders")
      .add(newOrder)
      .then(function (docRef) {
        response.message = docRef.id;
        return response;
      });
    return orders;
  } catch (err) {
    throw err.message;
  }
}

// update existing order
// Tested successfully
async function update(orderID, body) {
  // Create object for response message
  let responseMessage = {
    message: "Order updated",
    status: true,
  };
  // Update order and return response message
  try {
    const order = db.collection("orders").doc(orderID);
    const res = await order.set(
      {
        ...body,
      },
      { merge: true }
    );
    return responseMessage;
  } catch (error) {
    throw error.message;
  }
}

// Delete existing order
// Tested successfully
async function remove(orderId) {
  // Create object for response message
  let responseMessage = {
    message: "",
    status: false,
  };
  // Delete order if it exists, print error message otherwise.
  let order = await getByID(orderId);
  if (order.orderExists) {
    await db.collection("orders").doc(orderId).delete();
    let orderTwo = await getByID(orderId);
    if (!orderTwo.orderExists) {
      responseMessage.message = "Order deleted";
      responseMessage.status = true;
    } else {
      responseMessage.message = "Something went wrong. Try again.";
    }
  } else {
    responseMessage.message = "Order does not exist";
  }
  return responseMessage;
}

//Returns all orders that have a match on userid field
async function getOrdersByUser(userid) {
  let allOrders = await getAll();
  let filteredOrders = allOrders.filter(order => order.userid == userid)
  return filteredOrders;
}

//Returns all orders that have a match on userid field
async function getShoppingBasket(user) {
  let ordersFilteredByUser = await getOrdersByUser(user.id)
  let ordersInProgress = ordersFilteredByUser.filter(order => order.status == "in progress")
  if (ordersInProgress.length == 0) {
    //0 orders in progress --> create one
    let newOrder = {
      address: user.address ? user.address : '',
      items: [],
      userid: user.id,
      status: "in progress",
    };
    
    let createMessage = await add(newOrder)
    let createdOrder = await getByID(createMessage.message)
    return createdOrder.finalOrder;
  } else if (ordersInProgress.length == 1){ 
    return ordersInProgress[0];
  } 
  return filteredOrders;
}

module.exports = { getAll, add, update, remove, getByID, getOrdersByUser, getShoppingBasket};