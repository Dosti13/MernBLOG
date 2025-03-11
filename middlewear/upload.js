const multer = require('multer')
// const cloudinary = require('cloudinary').v2;
// const dotenv = require("dotenv")
const storage = multer.diskStorage(
    {destination :function(req,file,cb){

        cb(null ,'./uploads')
        
    },
     filename:function(req,file,cb){
        const date = Date.now()
        cb(null , date + '-'+ file.originalname ) 
    }
    })
const upload = multer({storage})

module.exports = upload