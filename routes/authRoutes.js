const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/UserModel');
const {auth} = require('../middleware/auth');

// @route POST api/auth
// @desc Auth users
// @access Public
router.post('/', (req, res) => {
  const { email, password } = req.body;

  // Simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields 🙂' });
  }

  // Check for existing user
  User.findOne({ email }).then((user) => {
    if (!user)
      return res.status(400).json({
        msg: 'User Does not exist',
      });

    //   Validate password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

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
                id: user.id,
                name: user.name,
                email: user.email,
              },
            });
          } else {
            res.json({
              token,
              message: 'Welcome User',
              user: {
                id: user.id,
                name: user.name,
                email: user.email,
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
    .then((user) => res.json(user));
});

module.exports = router;
