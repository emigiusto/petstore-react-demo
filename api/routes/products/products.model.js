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
    const productCollection = db.collection('products');
    
    // Array based on productId
    let customerArray = await getAll();
    let index = findProduct(customerArray, productId); // findIndex

    // If product does not exits
    if (index === -1){
      return `Product with ID: ${productId} doesn't exist`
      /* throw new Error(`Product with ID:${productId} doesn't exist`); */
    }
    // If product does exits
    const product = await productCollection.doc(productId).get();
    const finalProd = {
      id: product.id,
      ...product.data(),
    }
    return finalProd;
  } catch (err) {
      throw err.message;
  }
}

// create a new product
async function add(newProduct) {
try {
  const exampleProd =  {
    name: "nicholas",
    price: 45
  }
  const products = db.collection('products').doc();

  // Later...
  const newId = await products.set(exampleProd);
  console.log(newId)

console.log("added!")

} catch (err) {
  throw err.message;
  
}
}

// update existing product
async function update(customerId, customer) {
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
async function remove(customerId) {
  let customerArray = await getAll();
  let index = findCustomer(customerArray, customerId); // findIndex
  if (index === -1)
    throw new Error(`Customer with ID:${customerId} doesn't exist`);
  else {
    customerArray.splice(index, 1); // remove customer from array
    await save(customerArray);
  }
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