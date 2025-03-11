const fs = require('fs')
 const cloudinary = require('cloudinary').v2;
 const Blog = require('../model/Blog')
 const streamifier = require('streamifier');

 require("dotenv").config()
 cloudinary.config({
     cloud_name: process.env.CLOUDANARY_NAME,
     api_key: process.env.CLOUDANARY_API_KEY,
     api_secret: process.env.CLOUDANARY_SECRET_KEY,
 });
async function handlefileupload(req,res) {
   
    const {title,description} = req.body
    try {
        
    
    const uplloadResult =  await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: 'your_folder_name' }, 
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        
        streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
      });

        const file = uplloadResult.secure_url

        const newBlog = new Blog({
             title
             , description
             , file ,
             createdBy:req.user._id
             
            });
         newBlog.save();
         return res.redirect("/")
    }
    catch(error){
        console.log(error);
        
    }

}
async function handleGetUserByID(req,res) {

        try {
            const _id = String(req.params.id) 
            if (!req.user) {
                return res.status(401).send("Unauthorized: No user found");
            }        
            const {email} = req.user
            
             const data = await Blog.findById({_id}).populate("createdBy")
            const blog = await Blog.findById(_id)
                .populate({
                    path: 'comments',
                    populate: { path: 'commentBy', select: 'name' }
                });
            const isOwner = email === data.createdBy.email;
    
            
            res.render("blog" , { blog: data, owner: isOwner,comments:blog.comments })
            
        
        } catch (error) {
            console.log(error);
        
        }
}   
async function handledeleteblog(req, res) {
    const _id = String(req.params.id);

    try {
        // Find the blog by ID
        const blog = await Blog.findById(_id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        const fileUrl = blog.file;
        
        const publicId = fileUrl.split('/').pop().split('.')[0]; 

        await cloudinary.uploader.destroy(`blog_images/${publicId}`);

        await Blog.findByIdAndDelete(_id);

        return res.redirect("/");
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" });
    }
}
async function handleupdate(req,res) {
    const _id = String(req.params.id)
    try {
        const update = await Blog.findByIdAndUpdate(_id,
            { $set: req.body }
        )
        if (!update) {
            return res.status(404).json({ message: "Blog not found" });
        }

        return res.json({ message: "Update successful", blog: update });
    } catch (error) {
        console.log(error);
        
    }
    res.status(200).end("kch nzar aya ")    

}
module.exports={handlefileupload,handleGetUserByID,handledeleteblog,handleupdate}