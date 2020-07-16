const express = require('express');
const passport = require('passport');
const authController = require('../controllers/authController');

const { forwardAuthenticated } = require('../config/authConfig');

const router = express.Router();
const User = require('../models/userModel');


// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// signup Page
router.get('/signup', forwardAuthenticated, (req, res) => res.render('signup'));

router.post('/signup', async (req, res) => {
  
  let errors = [];
  const { name, email, password, password2 } = req.body;


  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }


  if (password.length < 4) {
    errors.push({ msg: 'Password must be at least 4 characters' });
  }

  if (errors.length > 0) {
    return res.render('signup', {
      errors,
      name,
      email,
      password,
      password2,
    });
  }

  try {
    const user = await User.findOne({ email: email });

    if (user) {
      errors.push({ msg: 'Email already exists' });
      return res.render('signup', {
        errors,
        name,
        email,
        password,
      });
    }

    await User.create({
      name,
      email,
      password,
    });

    req.flash('success_msg', 'You are now registered and can log in');
    res.redirect('/auth/login');
  } catch (error) {
    console.log(`Error : ${error}`);
  }
});

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/auth/login',
    failureFlash: true,
  })(req, res, next);
});


// Forget Password Page
router.get('/forgetpass', (req, res) => res.render('forgetpass'));

router.post('/forgetpass', authController.forgotPassword)

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/auth/login');
});

module.exports = router;
