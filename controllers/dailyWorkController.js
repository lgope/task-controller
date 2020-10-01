// Catch Async Error
const catchAsync = require('../utils/catchAsync');

// Global Error Handler
const AppError = require('../utils/appError');

// Global Error Handler
const factory = require('./handlerFactory');

// Models
const DailyWork = require('../models/dailyWorkModel');
const User = require('../models/userModel');
// const moment = require('moment');

// TODO: update | delete functionality on demand

exports.saveDailyWork = catchAsync(async (req, res, next) => {
  const { userId, userName, title, description } = req.body;

  if (!userId || !userName || !title || !description)
    return next(new AppError('Please enter all fields 🙂', 400));

  const user = await User.findById({ _id: userId });

  if (!user) return next(new AppError('No User found with that Id!', 404));

  const todaysWork = await DailyWork.create({
    userId,
    userName,
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

  const userDailyWorks = await DailyWork.find({ userId: user.id });

  if (!userDailyWorks) return next(new AppError('No daily works found.', 404));

  return res.status(200).json({
    status: 'success',
    userDailyWorks,
  });
});

// get all daily works, this routes is only for admin
exports.getAllDailyWorks = factory.getAll(DailyWork);

// catchAsync(async (req, res, next) => {
//   const dailyWorks = await DailyWork.find();

//   if (!dailyWorks)
//     return next(
//       new AppError('Something Wrong To get all works! Try again.', 404)
//     );

//   return res.status(200).json(dailyWorks);
// });

// get all daily works, this routes is only for admin
exports.getDailyWorksByDate = factory.getDataByDate(DailyWork);

// catchAsync(async (req, res, next) => {
//   const {userId, fromDate, toDate } = req.params;

//   const fromD = moment(fromDate).subtract(1,'days').format().split("T")[0]
//   const toD = moment(toDate).add(1,'days').format().split("T")[0]

//   const filteredDailyWorks = await DailyWork.find({ userId,
//     date: {
//       $gt: `${fromD}T00:00:00.000+00:00`,
//       $lt: `${toD}T00:00:00.000+00:00`,
//     },
//   });
//   res.status(200).json(filteredDailyWorks)
// });

// delete controller
exports.updateDailyWork = factory.updateOne(DailyWork);
exports.deleteDailyWork = factory.deleteOne(DailyWork);
