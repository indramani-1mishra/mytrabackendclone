const { getcarts } = require("../repository/cartrepository");
const { getproductsbyid } = require("../repository/productrepository");
const mongoose = require('mongoose')
const cart = require("../shema/cartshema");

const findCart = async (userId) => {  // Fixed function name formatting (camelCase)
    try {
        const response = await getcarts(userId);

        if (!response) {
            throw new Error("Cart not found for this user.");
        }

        return response;
    } catch (error) {
        console.error("Error in findCart:", error);  // Log full error for debugging
        throw new Error(`Error finding cart: ${error.message}`);
    }
};


const addToCart = async (userId, productId) => {
    try {
        let cart = await findCart(userId);
        const product = await getproductsbyid(productId);

        if (!product) {
            throw new Error("Product is not available");
        }
        if (!product.instock || product.quantity <= 0) {
            throw new Error("Product is not in stock");
        }

        if (!cart) {
            cart = new CartModel({
                user: userId,
                items: [],
            });
        }

        // Existing Cart में Product खोजें
        let cartItem = cart.items.find(item => item.product._id.toString() === productId.toString());

        if (cartItem) {
            if (product.quantity < cartItem.quantity + 1) {
                throw new Error("Not enough stock available");
            }
            cartItem.quantity += 1;
        } else {
            cart.items.push({
                product: productId,
                quantity: 1
            });
        }

        await cart.save();
        product.quantity -= 1;
        await product.save();

        return cart;
    } catch (error) {
        throw error;
    }
};

const removecart = async (userId, productId) => {
    try {
        const cart = await findCart(userId);
        const product = await getproductsbyid(productId);

        if (!cart) {
            throw { message: "Cart not found!" };
        }
        if (!product) {
            throw { message: "Product not found!" };
        }

        cart.items.forEach((item, index) => {
            if (item.product._id.toString() === productId.toString()) {
                item.quantity -= 1;

                if (item.quantity === 0) {
                    cart.items.splice(index, 1);  // ✅ अगर quantity 0 हो जाए तो remove कर दो
                }
            }
        });

        product.quantity += 1; // ✅ Remove होने पर stock में वापस add करें

        await cart.save();
        await product.save();

        return cart;
    } catch (error) {
        throw error;
    }
};


module.exports = {
    findCart,
    addToCart,
    removecart
};
