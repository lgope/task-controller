const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const AppError = require('../utils/appError');

const User = require('../models/userModel');
const { auth } = require('../middleware/auth');

// @route POST api/auth
// @desc Auth users
// @access Public
router.post('/', (req, res, next) => {
  const { email, password } = req.body;

  // Simple validation
  if (!email || !password) {
    return next(new AppError('Please enter all fields 🙂', 400));
    // return res.status(400).json({ msg: 'Please enter all fields 🙂' });
  }

  // Check for existing user
  User.findOne({ email }).then(user => {
    if (!user) return next(new AppError('User Does not exist', 400));

    // return res.status(400).json({
    //   msg: 'User Does not exist',
    // });

    //   Validate password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) return next(new AppError('Invalid credentials', 400));
      // return res.status(400).json({ msg: 'Invalid credentials' });

      jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;

          if (user.role === 'admin') {
            res.json({
              token,
              message: `Welcome ${user.name} to Admin Panel`,
              user: {
                _id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
              },
            });
          } else {
            res.json({
              token,
              message: 'Welcome User',
              user: {
                _id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
              },
            });
          }
        }
      );
    });
  });
});

// @route GET api/auth/user
// @desc Get users data
// @access Private
router.get('/user', auth, (req, res) => {
  User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user));
});

module.exports = router;
