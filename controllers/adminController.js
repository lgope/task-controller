// Catch Async Error
const catchAsync = require('../utils/catchAsync');

// Global Error Handler
const AppError = require('../utils/appError');

// Models
const User = require('../models/userModel');
// const Task = require('../models/taskModel');

// create user
exports.createUser = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  //   Simple validation
  if (!name || !email || !password) {
    return next(new AppError('Please enter all fields!', 400));
  }

  const user = await User.findOne({ email });
  if (user) {
    return next(
      new AppError(
        'Sorry. A user with that email address already exists, or the email was invalid.',
        400
      )
    );
  }

  const newUser = await User.create({ name, email, password });

  if (!newUser) {
    return next(new AppError('Something wrong! Try again.', 400));
  }

  return next(new AppError('User Successfully Inserted!', 201));
});

// get all users excluding admin data and password field
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find({ role: { $ne: 'admin' } })
    .sort({ createdAt: -1 })
    .select('-password');

  if (!users) return next(new AppError('No users found!', 404));

  // SEND RESPONSE
  return res.status(200).json({
    status: 'success',
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
