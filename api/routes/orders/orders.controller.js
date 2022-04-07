var orderModel = require('./orders.model.js');

async function getAllOrders(req, res) {
    try {
        let allOrders = await orderModel.getAll();
        res.json(allOrders);
    } catch (error) {
      // res.statusMessage=
      res.status(400).send(error.message);
    }
  }

async function addOrder(req, res) {
    try {
      let newOrder = req.body;
      console.log(newOrder)
      await orderModel.add(newOrder);
      res.end()
    } catch (error) {
      // res.statusMessage =
      res.status(400).send(error.message);
    }
  }
  async function getOrder (req, res) {
    try {
      let id = req.params.id
      let order = await orderModel.getByID(id);
      res.json(order);
    } catch (error) {
      // res.statusMessage=
      res.status(400).send(error.message);
    }
  }

  async function updateOrder (req, res) {
    try {
      let id = parseInt(req.params.id)
      let order = req.body;
      await orderModel.update(id, order);
      res.end();
    } catch (error) {
      // res.statusMessage=
      res.status(400).send(error.message);
    }
  }

  async function deleteOrder (req, res) {
    try {
      let id = parseInt(req.params.id)
      await orderModel.remove(id);
      res.end();
    } catch (error) {
      // res.statusMessage=
      res.status(400).send(error.message);
    }
  }

  module.exports = {getAllOrders, addOrder, getOrder, updateOrder, deleteOrder};