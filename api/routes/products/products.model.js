var db = require("../../dba/firestore")

// Return all products from Firebase
async function getAll() {
  try {
    const products = []
    const productCollection = db.collection('products');
    const snapshot = await productCollection.get();
      snapshot.forEach(doc => {
        products.push(
          {
            ...doc.data(),
            id: doc.id
          }
        );
      });
    return products
  } catch (err) {
      throw err.message;
  }
}

// Return a product by ID
async function getByID(productId) {
  try {
    const product = await db.collection('products').doc(productId).get();
    var response = {
      message: "",
      productExists: true,
      finalProd: {
        id: product.id,
        ...product.data()
      }
    }

    if (!product.data()) {
      response.message = `Product with ID: ${productId} doesn't exist`
      response.productExists = false
    }

    return response;
  } catch (err) {
      throw err.message;
  }
}

// create a new product
async function add(newProduct) {
try {
  console.log(newProduct)
  var response = {
    message: ""
  }
  const products = db
      .collection('products')
      .add(newProduct)
      .then(function (docRef) {
        response.message = docRef.id
        return response
      })
    return products;

} catch (err) {
  throw err.message;
}
}

// update existing product
async function update(id, body) {

  let responseMessage = {
    message: "Product updated",
    status: true
  }
  try {

    const product = db.collection('products').doc(id)
    const res = await product.set({
      ...body}, {merge: true}
    )
    return responseMessage

  } catch (error) {
    
  }

  let customerArray = await getAll();
  let index = findCustomer(customerArray, customerId); // findIndex
  if (index === -1)
    throw new Error(`Customer with ID:${customerId} doesn't exist`);
  else {
    customerArray[index] = customer;
    await save(customerArray);
  }
}

// delete existing product
async function remove(id) {
  let responseMessage = {
    message: "",
    status: false
  }
  let product = await getByID(id)
  if (product.productExists) {
    await db.collection('products').doc(id).delete()
    let productCheck = await getByID(id)
    if (!productCheck.productExists) {
      responseMessage.message = "Product deleted"
      responseMessage.status = true
    } else {
      responseMessage.message = "Something went wrong. Try again."
    }
  } else {
    responseMessage.message = "Product does not exist"
  }
  return responseMessage
  
}

module.exports = {getAll,add,update,remove,getByID};


//Helper functions --- Delete?
  // save array of customers to file
  async function save(customers = []) {
    let customersTxt = JSON.stringify(customers);
    await fs.writeFile(CUSTOMERS_FILE, customersTxt);
  }

  // test function for customer ID
  function findCustomer(customerArray, Id) {
    return customerArray.findIndex(
      (currCustomer) => currCustomer.customerId === Id
    );
  }

  function findProduct(productArray,productid) {
    return productArray.findIndex(
      (product) => product.id === productid
    )
  }