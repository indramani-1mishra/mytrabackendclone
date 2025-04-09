const { createUsers, finduserbyemailorphonenumber } = require("../service/userservice");

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

const getcurrentuser = async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          message: "Unauthorized - User not found in request",
          success: false,
          error: {},
          data: {},
        });
      }
  
      const email = req.user.email || null;
      const phonenumber = req.user.phonenumber || null;
  
      const response = await finduserbyemailorphonenumber(email, phonenumber);
  
      if (!response) {
        return res.status(404).json({
          message: "User not found",
          success: false,
          error: {},
          data: {},
        });
      }
  
      return res.status(200).json({
        message: "Successfully fetched user data",
        success: true,
        data: response,
        error: {},
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server error while fetching user",
        success: false,
        error: error.message,
        data: {},
      });
    }
  };
  
  

module.exports = {
    createuserController,
    getcurrentuser
};
