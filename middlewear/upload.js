const multer = require('multer')
// const cloudinary = require('cloudinary').v2;
// const dotenv = require("dotenv")
const storage = multer.memoryStorage()
const upload = multer({storage})

module.exports = upload