const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Catch Async Error
const catchAsync = require('../utils/catchAsync');

// Global Error Handler
const AppError = require('../utils/appError');

// Item Model
const User = require('../models/UserModel');

// create user
exports.createUser = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);

  //   Simple validation
  if (!name || !email || !password) {
    return next(new AppError('Please enter all fields 🙂', 400));
  }

  // Check for existing user
  User.findOne({ email }).then(user => {
    if (user) {
      return next(
        new AppError(
          'Sorry. A user with that email address already exists, or the email was invalid.',
          400
        )
      );
    }

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
        newUser.save().then(user => {
          jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;

              return res.status(201).json({
                success: 'User added',
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                  role: user.role,
                },
              });
            }
          );
        });
      });
    });
  });

  // next();
});

// get all users excluding admin data and password field
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find({role: {$ne: 'admin'}}).sort({ createdAt: -1 }).select("-password");

  // SEND RESPONSE
  res.status(200).json(users);
});
