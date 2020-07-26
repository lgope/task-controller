// assign task to a user
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const Task = require('../models/taskModel');

exports.assignTask = catchAsync(async (req, res, next) => {
  const { taskName, userEmail } = req.body;

  if (!taskName || !userEmail) return next(new AppError('Please enter all fields 🙂', 400));

  console.log(taskName, userEmail);
  // next(new AppError('User not found with that email!', 404));

  const newTask = await Task.create({ taskName, user: userEmail });

  return res.status(201).json({
    status: 'success',
    newTask,
  });
});

// get one taks
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
exports.getAllTasks = catchAsync(async (req, res, next) => {
  const tasks = await Task.find().sort({ user: -1, createdAt: -1 });
  // const users = await User.find({ role: { $ne: 'admin' } })
  //   .sort({ createdAt: -1 })
  //   .select('-password');

  if (!tasks) return next(new AppError('Tasks not found!', 404));

  // SEND RESPONSE
  return res.status(200).json({
    status: 'success',
    tasks,
  });
});

exports.updateProgress = catchAsync(async (req, res, next) => {
  const task = await Task.findById(req.params.id);
  if (!task) return next(new AppError('Task not found with ID!', 404));
  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedTask) return next(new AppError('Something wrong!', 400));

  return res.status(201).json({
    status: 'success',
    task: updatedTask,
  });
});

// update a task by id
// exports.updateTask = catchAsync(async (req, res, next) => {
//   const { taskName, user } = req.body;

//   // console.log(taskName, user);

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
//   // console.log(req.params.id);
//   const task = await Task.findByIdAndDelete(req.params.id);

//   if (!task) return next(new AppError('No task found with that ID', 404));

//   res.status(200).json({ msg: 'Task deleted!' });
// });
