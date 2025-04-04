const ProductModel = require("../shema/productSchema");


const createproduct = async (productdetails) => {
    try {
        const response = await ProductModel.create(productdetails);
        return response;
    } catch (error) {
        throw new Error("Error in creating product in repository layer: " + error.message);
    }
};


const getproductsbyid = async (id) => {
    if (!id) {
        throw new Error("Product ID is required");
    }
    try {
        const response = await ProductModel.findById(id);
        return response;
    } catch (error) {
        throw new Error("Error in finding product by ID: " + error.message);
    }
};

const deleteproductsbyid = async (id) => {
    if (!id) {
        throw new Error("Product ID is required for deletion");
    }
    try {
        const response = await ProductModel.findByIdAndDelete(id);
        return response;
    } catch (error) {
        throw new Error("Error in deleting product: " + error.message);
    }
};


const updateproduct = async (id, data) => {
    if (!id || !data) {
        throw new Error("Product ID and update data are required");
    }
    try {
        const response = await ProductModel.findByIdAndUpdate(id, data, { new: true });
        return response;
    } catch (error) {
        throw new Error("Error in updating product: " + error.message);
    }
};


const getproducts = async () => {
    try {
        const response = await ProductModel.find();
        return response;
    } catch (error) {
        throw new Error("Error in fetching all products: " + error.message);
    }
};


const findproductbycategory =async(categories)=>
{
  try
  {
   const response = await ProductModel.find({category:categories});
   return response
  }
  catch{
      throw({message:"error in findproductbycategory"});
  }
}
const findproductbydescription =async(descriptions)=>
    {
      try
      {
       const response = await ProductModel.find({description:descriptions});
       return response
      }
      catch{
          throw({message:"error in findproductbydescription"});
      }
    }
    



module.exports = {
    createproduct,
    getproducts,
    updateproduct,
    deleteproductsbyid,
    getproductsbyid,
    findproductbycategory,
    findproductbydescription
};
