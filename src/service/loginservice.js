const { findUserByEmailOrPhone } = require("../repository/userrepository");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY, JWT_EXPIREY } = require("../config/serverconfig");

const logins = async (userdetails) => {
    try {
        const { email, phonenumber, password } = userdetails;

         //console.log(phonenumber+"phone");
        // Ensure at least one identifier is provided
        if (!email && !phonenumber) {
            throw new Error("Email or phone number is required for login.");
        }

        // Find user by email or phone number
        const isUserRegistered = await findUserByEmailOrPhone({ email, phonenumber });
        if (!isUserRegistered) {
            throw("User not found with this email or phone number");
        }

        // Validate password
        const isPasswordValidated = await bcrypt.compare(password, isUserRegistered.password);
        if (!isPasswordValidated) {
            throw ({message:"password is wrong"});
            
        }
        const role= isUserRegistered.role?isUserRegistered.role:"user";
        // Generate JWT Token
        const token = jwt.sign(
            { email: isUserRegistered.email, id: isUserRegistered._id,role:role},
            JWT_SECRET_KEY,
            { expiresIn: JWT_EXPIREY }
        );

        return { token, message: "Login successful" };

    } catch (error) {
        console.error("Error in login function:", error.message);
        throw new Error(error.message || "Could not login user in service layer");
    }
};

module.exports = { logins };
