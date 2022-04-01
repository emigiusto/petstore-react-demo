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
    const categoryCollection = db.collection('categories');
    //array based on categoryId
    const category = await categoryCollection.doc(categoryId).get();
 const finalCategory = {
   id: category.id,
   ...category.data(),
 }
    return finalCategory;
  } catch (err) {
      throw err.message;
  }
}

// create a new category TO MAKE DYNAMIC
async function add(newCategory) {
try {
  const exampleCategory =  {
    name: "nicholas pants",
    price: 459
  }
  const newCategory= db.collection('categories').doc();

  // Later...
  const newId = await newCategory.set(exampleCategory);
  console.log(newId)

console.log("category added!")

} catch (err) {
  throw err.message;
  
}
}

// update existing category
async function update(categoryId, category) {
  let categoryArray = await getAll();
  let index = findCategory(categoryArray, categoryId); // findIndex
  if (index === -1)
    throw new Error(`Category with ID:${categoryId} doesn't exist`);
  else {
    categoryArray[index] = customer;
    await save(categoryArray);
  }
}

// delete existing category
async function remove(categoryId) {
  let categoryArray = await getAll();
  let index = findCategory(categoryArray, categoryId); // findIndex
  if (index === -1)
    throw new Error(`Category with ID:${categoryId} doesn't exist`);
  else {
    categoryArray.splice(index, 1); // remove category from array
    await save(categoryArray);
  }
}

module.exports = {getAll,add,update,remove,getByID};


//Helper functions --- Delete?
  // save array of category to file
  async function save(customers = []) {
    let categoryTxt = JSON.stringify(category);
    await fs.writeFile(CATEGORY_FILE, categoryTxt);
  }

  // test function for category ID
  function findCategory(categoryArray, Id) {
    return categoryArray.findIndex(
      (currCategory) => currCategory.categoryId === Id
    );
  }