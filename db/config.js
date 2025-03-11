const mongoose = require("mongoose")
require("dotenv").config()
async function connect(){
    try {
        await mongoose.connect(process.env.MONGO_URl)
        console.log("connected sucessfully ");
        
    } catch (error) {
        console.log(error);
        
    }
}
module.exports = connect