const express = require('express');
const { logincontroller } = require('../../controller/login');

const loginrouter = express.Router();

loginrouter.post("/",logincontroller);

module.exports=loginrouter;