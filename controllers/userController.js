// Catch Async Error
import catchAsync from '../utils/catchAsync.js';

// Global Error Handler
import AppError from '../utils/appError.js';

// Models
import User from '../models/userModel.js';
import Task from '../models/taskModel.js';
// const Discuss = require('../models/discussModel');

// get all user tasks
export const getUserTasks = catchAsync(async (req, res, next) => {
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
