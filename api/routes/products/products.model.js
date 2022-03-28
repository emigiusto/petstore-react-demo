var db = require("../../dba/firestore")

// Return all products from Firebase
async function getAll() {
  try {
    const products = []
    const productColletion = db.collection('products');
    const snapshot = await productColletion.get();
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
async function getByID(customerId) {
  let customerArray = await getAll();
  let index = findCustomer(customerArray, customerId);
  if (index === -1)
    throw new Error(`Customer with ID:${customerId} doesn't exist`);
  else return customerArray[index];
}

// create a new customer
async function add(newCustomer) {
  let customerArray = await getAll();
  if (findCustomer(customerArray, newCustomer.customerId) !== -1 )
    throw new Error(
      `Customer with Id:${newCustomer.customerId} already exists`
    );
  customerArray.push(newCustomer);
  await save(customerArray);
}

// update existing customer
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

// delete existing customer
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