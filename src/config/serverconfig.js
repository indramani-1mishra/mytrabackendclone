require("dotenv").config();

PORT= process.env.PORT;
MONGO_URL=process.env.MONGOURL;
API_KEY=process.env.API_KEY;
SECREAT_API_KEY=process.env.SECREAT_API_KEY;
CLOUDENAME=process.env.CLOUDENAME;
JWT_SECRET_KEY=process.env.JWT_SECRET_KEY;
JWT_EXPIREY=process.env.JWT_EXPIREY;


module.exports={
    PORT,
    MONGO_URL,
    CLOUDENAME,
    SECREAT_API_KEY,
    API_KEY,
    JWT_EXPIREY,
    JWT_SECRET_KEY
}