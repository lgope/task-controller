const express = require('express');
const router = express.Router();
const {
  ensureAuthenticated,
  forwardAuthenticated,
} = require('../config/authConfig');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('login'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => {
  // res.render('dashboard', {
  //   user: req.user,
  // })

  if (req.user.role === 'user') {
    console.log('user');
   return res.redirect('/user');
  }

  if (req.user.role === 'admin'){
    console.log('admin');
    return res.redirect('/admin')
  }
});

module.exports = router;
