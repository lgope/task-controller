const express = require('express');
const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

// @route POST api/users
// @desc Register new users
// @access Public
router.post('/', (req, res) => {
  const { name, email, password } = req.body;

  //   Simple validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields 🙂' });
  }

  // Check for existing user
  User.findOne({ email }).then((user) => {
    if (user)
      return res.status(400).json({
        msg:
          'Sorry. A user with that email address already exists, or the email was invalid.',
      });

    const newUser = new User({
      name,
      email,
      password,
    });

    // Create salt & Hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then((user) => {
          jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                },
              });
            }
          );
        });
      });
    });
  });
});

module.exports = router;
