const express = require('express');
const productrouter = require('./products');

const v1router= express.Router();

v1router.use("/products",productrouter);

module.exports=v1router;