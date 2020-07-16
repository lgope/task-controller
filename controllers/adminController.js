// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const passport = require('passport');

// Catch Async Error
const catchAsync = require('../utils/catchAsync');

// Global Error Handler
// const AppError = require('../utils/appError');

// Models
const User = require('../models/userModel');
// const Task = require('../models/taskModel');

exports.getHome = catchAsync(async (req, res, next) => {
  return res.render('admin/adminHomePage.ejs', {
    userName: req.user.name,
  });
});

// create user

// get all users excluding admin data and password field
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find({ role: { $ne: 'admin' } })
    .sort({ createdAt: -1 })
    .select('-password');

  // SEND RESPONSE
  // res.status(200).json(users);

  return res.render('admin/userInfo.ejs', {
    users,
  });
});

// delete one user by email
// exports.deleteUser = catchAsync(async (req, res, next) => {
//   const user = await User.findByIdAndDelete(req.params.id);

//   if (!user) return req.flash('error_msg', 'No user found with that ID');

//   // res.status(200).json({ msg: 'User deleted!' });
//   req.flash('success_msg', 'User deleted!');
// });
