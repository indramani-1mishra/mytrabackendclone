const express = require('express');
const {  productcontrollerc, getproductsbuidcontroller, removeproductscontroller, productUpdatecontroller, getAllProductsController } = require('../../controller/productcontroller');
const upload = require('../../middleware/multer');
const { isLoggedIn, isAdmin } = require('../../validetor/islogin');
//const upload = require("../middleware/multer");
const productrouter = express.Router();
//const upload = multer({ dest: 'uploads/' });

productrouter.post('/',isLoggedIn,isAdmin,upload.single('image'),productcontrollerc);
productrouter.get("/",getAllProductsController);
productrouter.get('/:id',getproductsbuidcontroller);
productrouter.delete('/:id',isLoggedIn,isAdmin,removeproductscontroller);
productrouter.put("/:id",isLoggedIn,isAdmin,upload.single('image'),productUpdatecontroller)
module.exports=productrouter;


