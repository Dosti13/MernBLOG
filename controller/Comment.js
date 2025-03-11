
const comment = require('../model/Comment')

const Blog = require('../model/Blog')

async function handelcomment(req,res) {
    try {
        
        const text = req.body.text
        
        const blogid = req.params.id 
        const newComment= await comment.create({
            text:text,
            commentBy:req.user._id,
            commentBlog: blogid
        })
        await Blog.findByIdAndUpdate(blogid, { $push: { comments: newComment._id } });
        res.redirect(`/blog/${blogid}`);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error adding comment" });

    }

}
module.exports= {handelcomment}