const express = require('express')
const passport = require('passport')
const router = express.Router()
const User = require('../models/user')

const initializePassport = require('../passport-config')

initializePassport(
    passport,
    email => User.findOne({'email':email}),
    id => User.findById(id),
  )


router.get('/login',async (req,res) => {
    link = null
    if(req.query.link != null ) {
      link = req.query.link
    }
    res.render('users/index', { layout: false, link : link});
})

router.post('/login',passport.authenticate('local', {
    failureRedirect: '/users/login',
    failureFlash: true
}),function (req,res) {
  if(req.body.link != null ) {
    res.redirect('/payments/redeem/?link=' + req.body.link)
  }else{
    res.redirect('/payments')
  }
})

router.post('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});


// Helper Functions
function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/login')
  }
  
  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/')
    }
    next()
  }

//export
module.exports = router