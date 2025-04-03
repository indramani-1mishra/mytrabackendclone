const express = require('express');
const productrouter = require('./products');
const userrouter = require('./user');
const loginrouter = require('./login');
const cartrouter = require('./carts');


const v1router= express.Router();

v1router.use("/products",productrouter);
v1router.use("/users",userrouter);
v1router.use('/login',loginrouter);
v1router.use('/cart',cartrouter)
module.exports=v1router;