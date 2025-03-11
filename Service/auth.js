const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")

dotenv.config()
function setuser(user){
    
    return jwt.sign({
        _id:user._id,
        name:user.name,
        email:user.email

    },process.env.SECRET_KEY)

}
function getuser(token){

   return jwt.verify(token,process.env.SECRET_KEY)

}
module.exports={
    setuser,
    getuser
}