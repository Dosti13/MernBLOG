const User = require('../model/User')
const {setuser} = require("../Service/auth")

async function handleSignup(req,res) {
    const {name ,email,password} = req.body
    
   await User.create({
        name,
        email,
        password
    })
    return res.render("login")
}
async function handleLogin(req,res) {
    const {email, password} = req.body
    const user = await User.findOne({email})
    
    if(!user) return res.redirect("login")
     const match = await user.comparePassword(password)   
    if(!match) return res.end("password ghlt")
     const token = setuser(user) 
    res.cookie("uid",token)  
     res.redirect("/")

    
}
module.exports= {
    handleSignup,
    handleLogin
}