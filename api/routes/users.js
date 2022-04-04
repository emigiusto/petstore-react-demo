var express = require('express');
var router = express.Router();
var db = require("../dba/firestore");
const { getAllUsers } = require('./users/users.controller');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
