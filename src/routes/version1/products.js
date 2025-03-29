const express = require('express');
const {  productcontrollerc, getallproductscontroller, getproductsbuidcontroller, removeproductscontroller, productUpdatecontroller, getAllProductsController } = require('../../controller/productcontroller');
const upload = require('../../middleware/multer');
//const upload = require("../middleware/multer");
const productrouter = express.Router();
//const upload = multer({ dest: 'uploads/' });

productrouter.post('/',upload.single('image'),productcontrollerc);
productrouter.get("/",getAllProductsController);
productrouter.get('/:id',getproductsbuidcontroller);
productrouter.delete('/:id',removeproductscontroller);
productrouter.put("/:id",upload.single('image'),productUpdatecontroller)
module.exports=productrouter;


