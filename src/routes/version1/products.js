const express = require('express');
const {
  productcontrollerc,
  getproductsbuidcontroller,
  removeproductscontroller,
  productUpdatecontroller,
  getAllProductsController,
  getProductsByCategoryc,
  getProductsBydiscriptionc
} = require('../../controller/productcontroller');

const upload = require('../../middleware/multer');
const { isLoggedIn, isAdmin } = require('../../validetor/islogin');

const productrouter = express.Router();

// Create a product
productrouter.post('/', isLoggedIn, isAdmin, upload.single('image'), productcontrollerc);

// Get all products
productrouter.get("/", getAllProductsController);

// Get products by category - should be before :id
productrouter.get("/category/:category", getProductsByCategoryc);

// Get products by name/description - should be before :id
productrouter.get("/description/:description", getProductsBydiscriptionc);

// Get product by ID
productrouter.get("/:id", getproductsbuidcontroller);

// Delete a product
productrouter.delete('/:id', isLoggedIn, isAdmin, removeproductscontroller);

// Update a product
productrouter.put("/:id", isLoggedIn, isAdmin, upload.single('image'), productUpdatecontroller);

module.exports = productrouter;
