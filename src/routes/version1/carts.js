const express = require("express");
const { getcartc, addtocartc, removetocartc } = require("../../controller/cartscontroller");
const { isLoggedIn } = require("../../validetor/islogin");

const cartrouter = express.Router();

cartrouter.get("/", isLoggedIn, getcartc);
cartrouter.post('/:id',isLoggedIn,addtocartc);
cartrouter.delete("/:id",isLoggedIn,removetocartc);

module.exports = cartrouter;  // ✅ Sahi Export
