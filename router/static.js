const express = require('express')
const router = express.Router()
const Blog = require('../model/Blog')
const { isAuthor } = require('../middlewear/auth')

router.get('/login',(req,res)=>{
    res.render("login")
})
router.get('/signup',(req,res)=>{
    
    res.render("Signup")

})
router.get('/header',(req,res)=>{
    const token = req.cookies?.uid

    res.render("header",{token})
})
router.get('/addblog',(req,res)=>{
    
    if(!req.user) return res.render("login")
    res.render("addblog")
})
router.get('/blog/delete/:id',isAuthor,async(req,res)=>{
    try {
        const _id = req.params.id;
        const blog = await Blog.findById(_id);

        if (!blog) {
            return res.status(404).send("Blog not found");
        }

        res.render("deleteblog", { blog });
    } catch (error) {
        console.error(error);
        res.status(500).send("internal server ");
    }
})
router.get('/blog/update/:id',isAuthor,async(req,res)=>{
    try {
        const _id = req.params.id;
        const blog = await Blog.findById(_id).populate("createdBy")

        if (!blog) {
            return res.status(404).send("Blog not found");
        }

        res.render("updateblog", { blog });
    } catch (error) {
        console.error(error);
        res.status(500).send("internal error");
    }
})

router.get('/',async(req,res)=>{
  const data = await Blog.find({}).populate("createdBy")
res.render("index" ,{data})
})
module.exports= router