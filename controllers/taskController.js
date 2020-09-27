// assign task to a user
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const moment = require('moment');

const factory = require('./handlerFactory');

const Task = require('../models/taskModel');

exports.assignTask = factory.createOne(Task);

// catchAsync(async (req, res, next) => {
//   const { taskName, userEmail } = req.body;

//   if (!taskName || !userEmail) return next(new AppError('Please enter all fields 🙂', 400));

//   // next(new AppError('User not found with that email!', 404));

//   const newTask = await Task.create({ taskName, user: userEmail });

//   return res.status(201).json({
//     status: 'success',
//     newTask,
//   });
// });

// get one task
exports.getTask = catchAsync(async (req, res, next) => {
  const task = await Task.findById(req.params.id);

  if (!task) return next(new AppError('Task not found with ID!', 404));

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  // todays day
  const day = weekdays[new Date().getDay()];

  return res.status(200).json({
    status: 'success',
    task,
  });
});

// get all tasks
exports.getAllTasks = factory.getAll(Task);

// catchAsync(async (req, res, next) => {
//   const tasks = await Task.find().sort({ user: -1, createdAt: -1 });
//   // const users = await User.find({ role: { $ne: 'admin' } })
//   //   .sort({ createdAt: -1 })
//   //   .select('-password');

//   if (!tasks) return next(new AppError('Tasks not found!', 404));

//   // SEND RESPONSE
//   return res.status(200).json(tasks);
// });

// exports.updateProgress = catchAsync(async (req, res, next) => {
//   const task = await Task.findById(req.params.id);
//   if (!task) return next(new AppError('Task not found with ID!', 404));
//   const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//     runValidators: true,
//   });

//   if (!updatedTask) return next(new AppError('Something wrong!', 400));

//   return res.status(201).json({
//     status: 'success',
//     task: updatedTask,
//   });
// });

exports.updateTask = factory.updateOne(Task);
exports.deleteTask = factory.deleteOne(Task);

exports.getTasksByDate = catchAsync(async (req, res, next) => {
  const { userEmail, fromDate, toDate } = req.params;

  const fromD = moment(fromDate).subtract(1, 'days').format().split('T')[0];
  const toD = moment(toDate).add(1, 'days').format().split('T')[0];
  let filteredData;

  if (userEmail) {
    filteredData = await Task.find({
      userEmail,
      createdAt: {
        $gt: `${fromD}T00:00:00.000+00:00`,
        $lt: `${toD}T00:00:00.000+00:00`,
      },
    });
  } else {
    filteredData = await Task.find({
      createdAt: {
        $gt: `${fromD}T00:00:00.000+00:00`,
        $lt: `${toD}T00:00:00.000+00:00`,
      },
    });
  }

  res.status(200).json(filteredData);
});

// update a task by id
// exports.updateTask = catchAsync(async (req, res, next) => {
//   const { taskName, user } = req.body;

//   if (!taskName || !user)
//     return next(new AppError('Please enter all fields 🙂', 400));

//   const verifyUser = await User.findOne({ email: user });

//   if (!verifyUser)
//     return next(new AppError('User not found with that email!', 404));

//   const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//     runValidators: true,
//   });

//   if (!task) {
//     return next(new AppError('No task found with that ID', 404));
//   }

//   res.status(200).json({ msg: 'Task Updated!' });
// });

// delete one tasks by id
// exports.deleteTask = catchAsync(async (req, res, next) => {

//   const task = await Task.findByIdAndDelete(req.params.id);

//   if (!task) return next(new AppError('No task found with that ID', 404));

//   res.status(200).json({ msg: 'Task deleted!' });
// });
