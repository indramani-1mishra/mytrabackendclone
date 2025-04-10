const { findCart, addToCart, removecart } = require("../service/cartservice");

const getcartc = async (req, res) => {
    try {
        const response = await findCart(req.user.id);

        if (!response) {
            return res.status(404).json({
                message: "Cart not found",
                data: {},
                error: {},
                success: false,
            });
        }

        return res.status(200).json({
            message: "Successfully fetched cart data",
            data: response,
            error: {},
            success: true,
        });
    } catch (error) {
        return res.status(500).json({  // Internal Server Error
            message: "Unable to fetch cart data",
            data: {},
            error: error.message,
            success: false,
        });
    }
};

const addtocartc = async (req, res) => {
    try {
        const response = await addToCart(req.user.id, req.params.id);

        return res.status(200).json({
            message: "Successfully added to cart",
            data: response,
            error: {},
            success: true,
        });
    } catch (error) {
        return res.status(400).json({  // Bad Request
            message: "Unable to add item to cart",
            data: {},
            error: error.message,
            success: false,
        });
    }
  }
const removetocartc = async (req, res) => {
  try {
      const response = await removecart(req.user.id, req.params.id);

      return res.status(200).json({
          message: "Successfully removed to cart",
          data: response,
          error: {},
          success: true,
      });
  } catch (error) {
      return res.status(400).json({  // Bad Request
          message: "Unable to remove item to cart",
          data: {},
          error: error.message,
          success: false,
      });
  }
};




module.exports = {
    getcartc,
    addtocartc,
    removetocartc
};
