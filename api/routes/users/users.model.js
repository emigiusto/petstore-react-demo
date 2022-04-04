var db = require("../../dba/firestore")

// Return all users from Firebase
async function getAll() {
  try {
    const users = []
    const userCollection = db.collection('users');
    const snapshot = await userCollection.get();
      snapshot.forEach(doc => {
        users.push(
          {
            ...doc.data(),
            id: doc.id
          }
        );
      });
    return users
  } catch (err) {
      throw err.message;
  }
}

// Return a product by ID
async function getByID(userID) {
  try {
    const userCollection = db.collection("users");

    // Array based on userID
    let userArray = await getAll();
    let index = findUser(userArray, userID); // findIndex

    // If user does not exits
    if (index === -1){
      return `User with ID: ${userID} doesn't exist`
    }

    //array based on userID
    const user = await userCollection.doc(userID).get();
    const finalUser = {
      id: user.id,
      ...user.data(),
    };
    return finalUser;
  } catch (err) {
      throw err.message;
  }
}

// create a new product
async function add(newUser) {
try {
  const exampleProd =  {
    name: "nicholas",
    price: 45
  }
  const users = db.collection('users').doc();

  // Later...
  const newId = await users.set(exampleProd);
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

  function findUser(userArray,userId) {
    return userArray.findIndex(
      (user) => user.id === userId
    )
  }