const multer = require("multer");
const fs = require("fs");

// Ensure the 'upload' folder exists
const uploadDir = "./upload";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // Save in 'upload' folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Avoid duplicate filenames
  }
});

const upload = multer({ storage });

module.exports = upload;
