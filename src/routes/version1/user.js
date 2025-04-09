const express = require('express');
const { createuserController, getcurrentuser } = require('../../controller/usercontroller');
const { isLoggedIn } = require('../../validetor/islogin');
const userrouter = express.Router();

userrouter.post("/",createuserController);
userrouter.get('/',isLoggedIn,getcurrentuser)

module.exports=userrouter;