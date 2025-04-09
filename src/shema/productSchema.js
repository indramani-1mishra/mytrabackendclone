const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productname: {
      type: String,
      
      minlength: [5, "Product name should be at least 5 characters"],
      required:true
    },
    description: {
      type: String,
   //   required: true,
      minlength: [5, "Product description should be at least 5 characters"],
    },
    price: {
      type: Number,
    required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["all", "men", "women", "kids", "toys", "jewelry", "electronics","shoes",'Eyewear',"perfume","bags"],
      default: "all",
    },
    instock: {
      type: Boolean,
      default: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 10, // Default quantity is 1
      min: [0, "Quantity should be at least 1"], // Minimum 1 product required
    },
    image: {
      type: String,
    },
    rating: {
      type: Number,
      default: 0, // Default rating should be 0
      min: 0,
      max: 5, // Ensure rating is between 0 and 5
    },
  },
  {
    timestamps: true, 
  }
);

const ProductModel = mongoose.model("Product", productSchema);

module.exports = ProductModel;