const express = require('express');
const router = express.Router();
const { Products, Transactions } = require("../models");
const validator = require("fastest-validator");
const v = new validator();
const verify = require('../middleware/verify');

router.get("/", verify, async function(req,res,next){
    try {
        const data = await Products.findAll()
        return res.json(data);
    } catch (error) {
        return res.status(404).json({
          status: 404,
          message: `Terjadi Error : ${error}`,
        });
    }
});

router.get("/:id", verify, async function(req,res,next){
    try {
        const data = await Products.findByPk(req.params.id)
        return res.json(data);
    } catch (error) {
        return res.status(404).json({
          status: 404,
          message: `Terjadi Error : ${error}`,
        });
    }
});

router.post("/create", verify, async function(req, res, next) {
    const schema = {
        name: "string",
        price: "number",
        image: "string|optional"
    }

    const validate = v.validate(req.body, schema);
    if (validate.length) {
        return res.status(422).json(validate);
    }

    const products = await Products.create(req.body);
    return res.json({
        status: 201,
        messsage: "Success Create Products",
        data: products
    })
})

router.post("/create", verify, async function(req, res, next) {
    const schema = {
        name: "string",
        price: "number",
        image: "string|optional"
    }

    const validate = v.validate(req.body, schema);
    if (validate.length) {
        return res.status(422).json(validate);
    }

    const products = await Products.create(req.body);
    return res.json({
        status: 201,
        messsage: "Success Create Products",
        data: products
    })
})

module.exports = router;