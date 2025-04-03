const express = require('express');
const { createuserController } = require('../../controller/usercontroller');
const userrouter = express.Router();

userrouter.post("/",createuserController);

module.exports=userrouter;