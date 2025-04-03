const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../config/serverconfig");

const isLoggedIn = async (req, res, next) => {
    try {
        // 1️⃣ कुकी से JWT टोकन लेना
        const jwttoken = req.cookies["authtoken"];  
        // console.log(jwttoken);
        if (!jwttoken) {
            return res.status(401).json({
                message: "Authentication failed",
                error: "No auth token provided",
                success: false,
                data: {}
            });
        }

        // 2️⃣ JWT वेरिफिकेशन को try-catch में डालना
        let decoded;
        try {
            decoded = jwt.verify(jwttoken, JWT_SECRET_KEY);
        } catch (error) {
            return res.status(401).json({
                message: "Authentication failed",
                error: "Invalid or expired auth token",
                success: false,
                data: {}
            });
        }

        // 3️⃣ यूजर डेटा req.user में सेव करना
        req.user = {
            email: decoded.email, // ✅ सही तरीका
            id: decoded.id,
            role:decoded.role
        };

        // 4️⃣ अगले मिडलवेयर को कॉल करना
        next();

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
            success: false,
            data: {}
        });
    }
};

const isAdmin = (req, res, next) => {
    try {
        
        if (!req.user || !req.user.role) {
            return res.status(401).json({
                message: "Not authorized",
                success: false,
                data: {},
                error: "User data not found"
            });
        }

      
        if (req.user.role === "admin") {
            return next(); 
        }

       
        return res.status(403).json({
            message: "Access denied",
            success: false,
            data: {},
            error: "User is not authorized as admin"
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            success: false,
            data: {},
            error: error.message
        });
    }
};



module.exports = { isLoggedIn,isAdmin };
