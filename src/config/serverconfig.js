require("dotenv").config();

PORT= process.env.PORT;
MONGO_URL=process.env.MONGOURL
module.exports={
    PORT,
    MONGO_URL
}