const { CLOUDENAME, API_KEY, SECREAT_API_KEY } = require("./serverconfig");
const cloudinary = require("cloudinary").v2; 

cloudinary.config({
    cloud_name: CLOUDENAME,
    api_key: API_KEY,
    api_secret: SECREAT_API_KEY,
});

module.exports = { cloudinary };