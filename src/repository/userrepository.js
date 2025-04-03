const User = require("../shema/usershema");

const createuser = async (userdetails) => {
    try {
        const response = await User.create(userdetails);
        return response;
    } catch (error) {
        console.error("Error in createuser:", error.message);
        throw new Error("Error in creating user in repository layer.");
    }
};

const findUserByEmailOrPhone = async ({ email, phonenumber }) => {
    try {
        const query = {};
        if (email) query.email = email;
        if (phonenumber) query.phonenumber = phonenumber;

        return await User.findOne(query);
    } catch (error) {
        console.error("Error in findUserByEmailOrPhone:", error.message);
        throw new Error("Error while finding user in repository layer.");
    }
};

module.exports = {
    createuser,
    findUserByEmailOrPhone
};
