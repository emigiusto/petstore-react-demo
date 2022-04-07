// index.js
var express = require('express');
//call all functions from users controller
var {getAllUsers, addUser, getUser, updateUser, deleteUser } = require('./users.controller.js');

const userRouter = express.Router();

// middleware specific to this route
userRouter.use(express.json())

// route handlers

userRouter.get("/", getAllUsers);

userRouter.get("/:id", getUser);

userRouter.put("/:id", updateUser);

userRouter.post("/", addUser);

userRouter.delete("/:id", deleteUser);

module.exports = userRouter;
