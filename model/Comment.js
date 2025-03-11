const mongoose = require("mongoose")



const CommentSchema = mongoose.Schema({
    text:{
        type:String,
        required:true,

    },
      commentBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
     commentBlog:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Blog"
    }

},{timestamps:true})

const comment = mongoose.model("comment",CommentSchema)

module.exports= comment