require("dotenv").config();

PORT= process.env.PORT;
MONGO_URL=process.env.MONGOURL;
API_KEY=process.env.API_KEY;
SECREAT_API_KEY=process.env.SECREAT_API_KEY;
CLOUDENAME=process.env.CLOUDENAME;



module.exports={
    PORT,
    MONGO_URL,
    CLOUDENAME,
    SECREAT_API_KEY,
    API_KEY
}