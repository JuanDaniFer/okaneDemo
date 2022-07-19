const express = require('express')
const router = express.Router()
const Account = require('../models/account')

router.get('/',async (req,res) => {
    res.send('Hello World')
})

//export
module.exports = router