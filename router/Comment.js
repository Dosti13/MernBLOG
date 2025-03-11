const express = require('express')
const router = express.Router()
const {handelcomment} = require('../controller/Comment') 

router.post('/blog/:id/comment',handelcomment)

module.exports = router