const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Account = require('../models/account')
const Link = require('../models/link')

router.get('/',async (req,res) => {
    let link = null
    if(req.query.link != undefined){
        link = req.query.link

        var url = require('url');
        address = url.format({
        protocol: req.protocol,
        host: req.get('host'),
        });

        link = address + '/payments/redeem/?link='+ link
        console.log(link)
    }
    const accounts = await Account.find({user: req.user})
    try {
        res.render('payments/index', {
            name:req.user.name,
            accounts:accounts,
            link:link
        })
    }catch {
        console.log('Error')
    }
})

router.post('/generatePaymentLink',async (req,res) => {
    const accounts = await Account.find({user: req.user})

    const link = new Link({
        value: req.body.value,
        account: req.body.account
    })
    try {
        const newlink = await link.save() 
        res.redirect(`/payments/?link=${newlink.name}`)
    }catch(err){
        console.log(err)
        res.send('Error')
    }
})

router.get('/redeem',checkAuthenticated, async(req,res) => {
    let success = false
    let link = {}
    if (req.query.success == 'true'){
        success = true
        link = {
            name : req.query.link,
            value : 0
        }
    }else{
        link = await Link.findOne({"name":req.query.link})
    }
    const accounts = await Account.find({user: req.user})
    res.render('payments/redeem', {
        name:req.user.name,
        accounts:accounts,
        link:link,
        success:success
    })
})

router.post('/redeem', async(req,res) => {
    const link = await Link.findById(req.body.link)
    const receipient = await Account.findById(link.account)
    const sender = await Account.findById(req.body.account)
    try {
        console.log(sender.value - link.value)
        sender.value = sender.value - link.value
        await sender.save()

        receipient.value = receipient.value + link.value
        await receipient.save()
        link.remove()
        console.log('redirecting')
        res.redirect(`/payments/redeem/?link=${link.name}&success=true`)
    }catch(err){
        res.send(err)
    }
})

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
      }
    if(req.query.link != null) {
        let link = req.query.link
        res.redirect('/users/login/?link=' + link)
    }else{
        res.redirect('/users/login')
    }
  }
//export
module.exports = router