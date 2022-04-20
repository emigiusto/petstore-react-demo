var db = require("../../dba/firestore")

// Return all categories from Firebase
async function getAll() {
  try {
    const categories = []
    const categoryCollection = db.collection('category');
    const snapshot = await categoryCollection.get();
      snapshot.forEach(doc => {
        categories.push(
          {
            ...doc.data(),
            id: doc.id
          }
        );
      });
    return categories
  } catch (err) {
      throw err.message;
  }
}

// Return a category by ID
async function getByID(categoryId) {
  try {
    // Get category with ID from database
    const category = await db.collection("categories").doc(categoryID).get();
    // Create a response message with categories data
    var response = {
      message: "",
      categoryExists: true,
      // Array based on categoryID
      finalCategory: {
        id: category.id,
        ...category.data(),
      },
    };
    // If the category does not exist set response to error message
    if (!category.data()) {
      response.message = `Category with ID: ${categoryID} doesn't exist`;
      response.categoryExists = false;
    }
    // return response
    return response;
  } catch (err) {
    throw err.message;
  }
}

// create a new category TO MAKE DYNAMIC
async function add(newCategory) {
try {
    var response = {
      message: "",
    };

    // Add new category and return response message containing the new categoryID
    const categories = db
      .collection("categories")
      .add(newCategory)
      .then(function (docRef) {
        response.message = docRef.id;
        return response;
      });
    return categories;
  } catch (err) {
    throw err.message;
  }
}

async function update(categoryId, category) {
  // Create object for response message
  let responseMessage = {
    message: "Category updated",
    status: true,
  };
  // Update category and return response message
  try {
    const category = db.collection("categories").doc(categoryId);
    const res = await category.set(
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

async function remove(categoryId) {
  // Create object for response message
  let responseMessage = {
    message: "",
    status: false,
  };
  // Delete category if it exists, print error message otherwise.
  let category = await getByID(categoryId);
  if (category.categoryExists) {
    await db.collection("categories").doc(categoryId).delete();
    let categoryTwo = await getByID(categoryId);
    if (!categoryTwo.categoryExists) {
      responseMessage.message = "Category deleted";
      responseMessage.status = true;
    } else {
      responseMessage.message = "Something went wrong. Try again.";
    }
  } else {
    responseMessage.message = "Category does not exist";
  }
  return responseMessage;
}

module.exports = {getAll,add,update,remove,getByID};