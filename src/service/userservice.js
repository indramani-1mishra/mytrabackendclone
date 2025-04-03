const { createCart } = require("../repository/cartrepository");
const { createuser, findUserByEmailOrPhone } = require("../repository/userrepository");

const createUsers = async (userDetails) => {  // Renamed 'productDetails' to 'userDetails' for clarity
    try {
        // Check if user is already registered
        const isRegistered = await findUserByEmailOrPhone({
            email: userDetails.email,
            phoneNumber: userDetails.phonenumber
        });

        if (isRegistered) {
            throw new Error("Email or phone number is already registered. Please use a different email and phone number.");
        }

        // Create new user
        const response = await createuser(userDetails);

        // Pass the new user's ID, not userDetails._id
        await createCart(response._id);

        return response;

    } catch (error) {
        console.error("Error in createUsers:", error);  // Logging entire error for debugging
        throw new Error(`User creation failed: ${error.message}`);
    }
};

module.exports = {
    createUsers
};
