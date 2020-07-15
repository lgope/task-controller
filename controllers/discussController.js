// Catch Async Error
const catchAsync = require('../utils/catchAsync');

// Global Error Handler
const AppError = require('../utils/appError');

// Models
const User = require('../models/userModel');
const Task = require('../models/taskModel');
const Discuss = require('../models/discussModel');

// get all discusses
exports.discuss = catchAsync(async (req, res, next) => {
  const { taskId, body } = req.body;

  if (!taskId || !body)
    return next(new AppError('Please enter all fields 🙂', 400));

  // find user by id
  const user = await User.findById(req.user.id);

  // if user not found
  if (!user) return next(new AppError('User not found!', 404));

  const task = await Task.findOne({ _id: taskId });

  if (!task) return next(new AppError('Task not found with that ID', 404));

  const newDiscuss = await Discuss.create({
    userEmail: user.email,
    taskId,
    body,
  });

  // SEND RESPONSE
  res.status(201).json(newDiscuss);
});
