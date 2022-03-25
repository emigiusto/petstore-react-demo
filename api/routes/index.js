
var express = require('express');
var router = express.Router();
//var { collection, getDocs } = require('firebase/firestore');
var db = require("../dba/firestore")

/* GET home page. */
router.get('/', function (req, res, next) {
  //res.render('index', { title: 'Express' });
  //log().then(response => console.log(response))
  getAllProducts().then(response =>  res.send(response) )
});

const getAllProducts = async () => {
  const products = []
    const productColletion = db.collection('products');
    const snapshot = await productColletion.get();
    snapshot.forEach(doc => {
      products.push({
        ...doc.data(),
        id: doc.id
      });
    });
    return products
}



module.exports = router;
