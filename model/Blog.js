const mongoose = require("mongoose")

const BlogSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,

    },
    description:{
        type:String,
        required:true
    },
    file:{
        type:String,
        required:true
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'comment' }],
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }

},{timestamps:true})
const Blog = mongoose.model("Blog",BlogSchema)

module.exports = Blog