const { createUsers } = require("../service/userservice");

const createuserController = async (req, res) => {
    try {
        const response = await createUsers({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password,
            email: req.body.email,
            phonenumber: req.body.phonenumber,
            role: req.body.role,
        });

        if (!response) {
            return res.status(404).json({
                message: "No response received from service layer.",
                error: {},
                data: {},
                success: false,
            });
        }

        return res.status(201).json({
            message: "User created successfully",
            data: response,
            error: {},
            success: true,
        });

    } catch (error) {
       // console.error("Error in createUserController:", error.message);

        return res.status(500).json({
            message: "Could not create user",
            success: false,
            error: error.message,
            data: {},
        });
    }
};

module.exports = {
    createuserController
};
