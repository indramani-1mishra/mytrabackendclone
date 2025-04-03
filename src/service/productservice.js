const { renameSync } = require("fs");
const { cloudinary } = require("../config/cloudneryconfig");
const { createproduct, getproducts, getproductsbyid, deleteproductsbyid, updateproduct, findproductbycategory } = require("../repository/productrepository");
const fs = require("fs").promises; // Use fs.promises for async file deletion


const createproductse = async (productdetails) => {
  try {
    // Image path check
    const imagepath = productdetails.image;
    if (!imagepath) {
      throw new Error("Image not found");
    }

    // Upload Image to Cloudinary
    const uploadcloudlery = await cloudinary.uploader.upload(imagepath, {
      folder: "products",
      resource_type: "image",
      quality: "auto",
    });

    const imageurl = uploadcloudlery.secure_url;

    // Delete temporary file after upload
    await fs.unlink(imagepath);

    // Create Product in Database
    const response = await createproduct({
      ...productdetails,
      image: imageurl
    });

    return response;
  } catch (error) {
    console.error("Service Error:", error.stack);
    throw new Error("Error in creating product service layer: " + error.message);
  }
};


const findproduct = async () => {
  try {
    return await getproducts();
  } catch (error) {
    console.error("Error:", error.message);
    throw new Error("Error in finding all products in service layer");
  }
};


const findproductbyid = async (id) => {  // ✅ id parameter add किया
  try {
    return await getproductsbyid(id);
  } catch (error) {
    console.error("Error:", error.message);
    throw new Error("Error in finding product by ID in service layer");
  }
};

const removeproducts = async (id) => {
  try {
    return await deleteproductsbyid(id);
  } catch (error) {
    console.error("Error:", error.message);
    throw new Error("Error in deleting product in service layer");
  }
};


const updateproducts = async (id, data) => {
  try {
    if (!id || !data) {
      throw new Error("Please provide both ID and data to update.");
    }

    let updatedimageurl = data.image;

   
    if (data.image) {
      const updatecloudnery = await cloudinary.uploader.upload(data.image, {
        folder: "products",
        resource_type: "image",
        quality: "auto",
      });
      updatedimageurl = updatecloudnery.secure_url;
      await fs.unlink(data.image);
    }

    
    const response = await updateproduct(id, {
      ...data,
      image: updatedimageurl,
    });

    return response;
  } catch (error) {
    console.error("Error:", error.message);
    throw new Error("Error in updating product in service layer");
  }
};


const searchbycategory = async (categories) => {
  try {
    return await  findproductbycategory(categories);
  } catch (error) {
    console.error("Error:", error.message);
    throw new Error("Error in deleting product in service layer");
  }
};


module.exports = {
  createproductse,
  findproduct,
  findproductbyid,
  removeproducts,
  updateproducts,
  searchbycategory
};
