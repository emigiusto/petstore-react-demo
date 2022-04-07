var userModel = require('./users.model.js');

async function getAllUsers(req, res) {
    try {
        let allUsers = await userModel.getAll();
        res.json(allUsers);
    } catch (error) {
      // res.statusMessage=
      res.status(400).send(error.message);
    }
  }

async function addUser(req, res) {
    try {
      let newUser = req.body;
      console.log(newUser);
      await userModel.add(newUser);
      res.end()
    } catch (error) {
      // res.statusMessage=
      res.status(400).send(error.message);
    }
  }
async function getUser(req, res) {
  try {
    let id = req.params.id;
    let user = await userModel.getByID(id);
    res.json(user);
  } catch (error) {
    // res.statusMessage=
    res.status(400).send(error.message);
  }
}
async function deleteUser(req, res) {
  try {
    let id = parseInt(req.params.id);
    await userModel.remove(id);
    res.end();
  } catch (error) {
    // res.statusMessage=
    res.status(400).send(error.message);
  }
}

module.exports = {getAllUsers, addUser, getUser, deleteUser};