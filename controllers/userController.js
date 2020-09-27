// Catch Async Error
const catchAsync = require('../utils/catchAsync');

// Global Error Handler
const AppError = require('../utils/appError');

// Models
const User = require('../models/userModel');
const Task = require('../models/taskModel');
// const Discuss = require('../models/discussModel');

// get all user tasks
exports.getUserTasks = catchAsync(async (req, res, next) => {
  // find user by id
  const user = await User.findById(req.user.id);

  // if user not found
  if (!user) return next(new AppError('User not found!', 404));

  // get all task by user email
  const tasks = await Task.find({ userEmail: user.email }).sort({
    createdAt: -1,
  });

  // SEND RESPONSE
  res.status(200).json(tasks);
});
