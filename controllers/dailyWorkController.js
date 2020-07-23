// Catch Async Error
const catchAsync = require('../utils/catchAsync');

// Global Error Handler
const AppError = require('../utils/appError');

// Models
const DailyWork = require('../models/dailyWorkModel');
const User = require('../models/userModel');

// TODO: update | delete functionality on demand

exports.saveDailyWork = catchAsync(async (req, res, next) => {
  const { userId, title, description } = req.body;

  if (!userId || !title || !description)
    return next(new AppError('Please enter all fields 🙂', 400));

  const user = await User.findById({_id: userId});

  if (!user) return next(new AppError('No User found with that Id!', 404));

  const todaysWork = await DailyWork.create({
    userId,
    title,
    description,
  });

  if (!todaysWork)
    return next(new AppError('Something Wrong To Save! Try again.', 404));

  return res.status(201).json({
    status: 'success',
    todaysWork,
  });
});

// get user daily works
exports.getUserDailyWorks = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) return next(new AppError('User not found with that ID!', 404));

  const userDailyWorks = await DailyWork.find({userId: user.id});

  if (!userDailyWorks)
    return next(new AppError('Something Wrong to get user daily works! Try again.', 404));

  return res.status(200).json({
    status: 'success',
    userDailyWorks,
  });
});

// get all daily works, this routes is only for admin
exports.getAllDailyWorks = catchAsync(async (req, res, next) => {
  const dailyWorks = await DailyWork.find();

  if (!dailyWorks)
    return next(new AppError('Something Wrong! Try again.', 404));

  return res.status(200).json({
    status: 'success',
    dailyWorks,
  });
});
