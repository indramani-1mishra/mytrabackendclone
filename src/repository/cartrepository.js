const mongoose = require("mongoose");
const cart = require("../shema/cartshema");



const createCart= async(userid)=>
{
    try {
        // ✅ Convert `userid` to ObjectId
       // const objectId = new mongoose.Types.ObjectId(userid);
       
        const response = await  cart.create({user:userid})
    
        return response;

    } catch (error) {
        throw {
            message: "Error in creating cart in repository layer",
            error: error.message  // Return actual error message
        };
    }
}







const getcarts = async (userid) => {
    try {
        const response = await cart
            .findOne({ user: userid })
           .populate("items.product");  // ✅ Ensure "items.product" is correct
    
        return response;
    } catch (error) {
        console.error("Error in findCart:", error); // ✅ Debugging के लिए पूरा error print करें
        throw {
            message: "Error in getting cart in repository layer",
            error: error.message
        };
    }
};
module.exports = {
    createCart,
    getcarts
};
