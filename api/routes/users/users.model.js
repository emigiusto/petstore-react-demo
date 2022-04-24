const res = require("express/lib/response");
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
    const user = await db.collection("users").doc(userID).get();
    // user will always contain the wrong id searched for
    var response = {
      message: "",
      userExists: true,
      //array based on userID
      finalUser: {
        id: user.id,
        ...user.data()
      }
    }
    
    if (!user.data()) {
      response.message = `User with ID: ${userID} doesn't exist`
      response.userExists = false
    }

    return response;
  } catch (err) {
      throw err.message;
  }
}

// add user to database
async function add(newUser) {
try {
  var response = {
    message: ""
  }
    const users = db
      .collection("users")
      .add(newUser)
      .then(function (docRef) {
        response.message = docRef.id
        return response
      });
    return users
  }
  catch (err) {
  throw err.message;
  
}
}

// update existing user
async function update(userID, body) {
  let responseMessage = {
    message: "User updated",
    status: true
  }
  try {
    const user = db.collection("users").doc(userID);
    const res = await user.set({
      ...body}, {merge: true}
    )
    return responseMessage
  } catch (error) {
      throw error.message;
  }
}

// delete existing product
async function remove(customerId) {
  let responseMessage = {
    message: "",
    status: false
  }
  let user = await getByID(customerId);
  if (user.userExists) {
    await db.collection('users').doc(customerId).delete()
    let userTwo = await getByID(customerId)
    if (!userTwo.userExists) {
      responseMessage.message = "User deleted"
      responseMessage.status = true
    } else {
      responseMessage.message = "Something went wrong. Try again."
    }
  } else {
    responseMessage.message = "User does not exist"
  }
  return responseMessage
}

module.exports = {getAll,add,update,remove,getByID};