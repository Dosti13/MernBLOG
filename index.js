const express = require("express")
const connect = require('./db/config')
const userRouter = require('./router/User')
const staticRouter = require('./router/static')
const BlogRouter = require('./router/Blog')
const CommentRouter = require('./router/Comment')
const {handleloginsystem} =  require('./middlewear/auth')
const cookieparser = require('cookie-parser')
const path = require("path");

const app = express()
const PORT = 4000 
const multer = require('multer')
app.use(express.json())
app.set("view engine" ,"ejs")
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({extended:true}))
app.use(cookieparser())
connect()
app.use((req, res, next) => {
    res.locals.token = req.cookies?.uid || ''; // Set token for all views
    next();
});
app.use(handleloginsystem)    
app.use('/user', userRouter )
app.use('/', staticRouter )
app.use('/blog' ,BlogRouter)
app.use('/' ,CommentRouter)

app.get('/logout',(req,res)=>{ 
    res.clearCookie("uid") 
    res.redirect("/")
})
app.listen(PORT,()=>{
    console.log(`server listen at ${PORT}`);
    
})