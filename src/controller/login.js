const { logins } = require("../service/loginservice");

const logincontroller = async (req, res) => {
    
    try {
        const response = await logins(req.body);
        
        // Set Cookie with Token
        res.cookie("authtoken", response.token, {
            httpOnly: true,
            secure: false, // Only secure in production
            maxAge: 7 * 24 * 60 * 60 * 1000 ,// 7 Days
            sameSite: 'None'
        });

        return res.status(201).json({
            message: "Login successful",
            success: true,
            data: {},
            error: {}
        });
    } catch (error) {
        return res.status(404).json({
            message: "Login failed",
            success: false,
            error: error.message,
            data: {}
        });
    }
};

module.exports = {
    logincontroller
};
