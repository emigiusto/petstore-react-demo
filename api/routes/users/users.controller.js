var userModel = require('./users.model.js');

async function getAllUsers(req, res) {
    try {
        let allUsers = await userModel.getAll();
        res.json({users: allUsers});
    } catch (error) {
      res.status(400).send({message:error.message});
    }
  }


async function updateUser(req, res) {
  try {
    let id = req.params.id;
    let body = req.body;
    let bodyValidaded = {}
    if (body.firstName) { bodyValidaded.firstName = body.firstName }
    if (body.lastName) { bodyValidaded.lastName = body.lastName }
    if (body.zip) { bodyValidaded.zip = body.zip }
    if (body.street) { bodyValidaded.street = body.street }
    if (body.city) { bodyValidaded.city = body.city }
    if (body.active) { bodyValidaded.active = body.active }

    let user = await userModel.getByID(id);
    if (user.userExists) {
      let responseMessage = await userModel.update(id, bodyValidaded)
      if (responseMessage.status) {
        res.json({message: responseMessage.message})
      } else {
        throw responseMessage.message
      }
    } else {
      throw "User does not exist"
    }
  } catch (message) {
    res.status(400).send({message: message});
  }
}

async function addUser(req, res) {
    try {
      let newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        zip: req.body.zip,
        street: req.body.street,
        city: req.body.city,
        active: true
      }
      if (newUser.firstName && newUser.lastName && newUser.zip && newUser.street && newUser.city) {
        let responseID = await userModel.add(newUser);
        res.json({id: responseID.message})
      } else {
        let errorResponse = {
          message: "Cannot add user as it is missing required fields."
        }
        throw errorResponse.message
      }
    } catch (message) {
      res.status(400).send({message: message});
    }
  }


async function getUser(req, res) {
  try {
    let id = req.params.id;
    let user = await userModel.getByID(id);
    if (user.userExists) {
      res.json(user.finalUser)
    } else {
      throw user.message
    }
  } catch (message) {
    res.status(400).send({message: message});
  }
}


async function deleteUser(req, res) {
  try {
    let id = req.params.id;
    let responseMessage = await userModel.remove(id);

    if (responseMessage.status) {
      res.json({message: responseMessage.message})
    } else {
      throw responseMessage.message
    }

  } catch (message) {
    res.status(400).send({message: message});
  }
}

module.exports = {getAllUsers, addUser, getUser, deleteUser, updateUser};