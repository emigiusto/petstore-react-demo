var db = require("../../dba/firestore");

// Return all orders from Firebase
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

// Return an order by ID
async function getByID(orderId) {
  try {
    const orderCollection = db.collection("orders");
    //array based on orderId
    const order = await orderCollection.doc(orderId).get();
    const finalOrder = {
      id: order.id,
      ...order.data(),
    };
    return finalOrder;
  } catch (err) {
    throw err.message;
  }
}

// create a new order
async function add(newOrder) {
  try {
    const orders = db
      .collection("orders")
      .add(newOrder)
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
      });

    //console.log("added!");
  } catch (err) {
    throw err.message;
  }
}

// update existing order
async function update(orderId, order) {
  let orderArray = await getAll();
  let index = findOrder(orderArrray, orderId); // findIndex
  if (index === -1) throw new Error(`Order with ID:${orderId} doesn't exist`);
  else {
    orderArray[index] = order;
    await save(orderArray);
  }
}

// delete existing order
async function remove(orderId) {
  let orderArray = await getAll();
  let index = findOrder(orderArray, orderId); // findIndex
  if (index === -1) throw new Error(`Order with ID:${orderId} doesn't exist`);
  else {
    orderArray.splice(index, 1); // remove order from array
    await save(orderArray);
  }
}

module.exports = { getAll, add, update, remove, getByID };

//Helper functions --- Delete?
// save array of orders to file
async function save(orders = []) {
  let ordersTxt = JSON.stringify(orders);
  await fs.writeFile(ORDERS_FILE, ordersTxt);
}

// test function for order ID
function findOrder(orderArray, Id) {
  return orderArray.findIndex((currOrder) => currOrder.orderId === Id);
}
