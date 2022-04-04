// index.js
var express = require('express');
//call all functions from users controller
var {getAllUsers, addUser, getUser, deleteUser } = require('./users.controller.js');

const userRouter = express.Router();

// middleware specific to this route
userRouter.use(express.json())

const name = [{name: "Hej"}]

// route handlers
/* userRouter.get("/", getAllUsers); */

userRouter.get("/", getAllUsers);

userRouter.get("/:id", getUser);

userRouter.post("/", addUser);

userRouter.delete("/:id", deleteUser);

module.exports = userRouter;
