const express = require('express');
const router = express.Router();
const { Transactions, Products } = require("../models");
const validator = require("fastest-validator");
const v = new validator();
const verify = require('../middleware/verify');

Products.hasMany(Transactions, {foreignKey: 'product_id'})
Transactions.belongsTo(Products, {foreignKey: 'product_id'})

router.get("/", async function(req,res){
  try {
      const data = await Transactions.findAll({
        include: [Products]
      });
      return res.json(data);
  } catch (error) {
      return res.status(404).json({
        status: 404,
        message: `Terjadi Error : ${error}`,
      });
  }
});

router.post("/checkout", verify, async function(req, res, next) {
  req.body.cart.map(async inp => (
      await Transactions.create({
          user_id: req.body.user_id,
          product_id: inp.id,
          price: inp.price,
          qty: inp.qty
      })
  ))

  return res.json({
      status: 201,
      messsage: "Success Create Transaction",
      data: req.body.cart
  })
})

module.exports = router;