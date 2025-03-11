const express = require('express')
const router = express.Router()
const {handlefileupload,handleGetUserByID,handledeleteblog,handleupdate} = require("../controller/Blog")
const upload= require('../middlewear/upload')
const { isAuthor } = require('../middlewear/auth')
const {handleloginsystem} = require('../middlewear/auth')

router.post('/addblog',upload.single('file'),handlefileupload)

router.get('/:id',handleGetUserByID)

router.post('/delete/:id',isAuthor ,handledeleteblog)
router.post('/update/:id',upload.single('file'),isAuthor,handleupdate)


module.exports= router