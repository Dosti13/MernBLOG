const {getuser} = require('../Service/auth')
const Blog = require("../model/Blog")
function  handleloginsystem (req,res,next){

    const token = req.cookies?.uid    
    req.user = null
    if(!token) return next()
    const user = getuser(token)    
    if(!user) res.render('login')
        req.user= user
    next()
}
const isAuthor = async (req, res, next) => {
    try {
        const blog = await Blog.findById(req.params.id).populate("createdBy")
        if (!blog) {
            return res.status(404).send("Blog not found");
        }

        if (req.user.email !== blog.createdBy.email) {
            return res.status(403).send("Unauthorized: You are not the author of this blog");
        }

        next();
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};
module.exports = {handleloginsystem ,isAuthor}