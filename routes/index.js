const express = require('express')
const router = express.Router()
const user = require('../models/user')

router.get('/',async (req,res) => {
    res.redirect('/users/login') // No Home page
})

//export
module.exports = router