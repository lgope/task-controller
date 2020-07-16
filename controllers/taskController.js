// assign task to a user
const catchAsync = require('../utils/catchAsync');

const Task = require('../models/taskModel');
const Discuss = require('../models/discussModel');

// exports.assignTask = catchAsync(async (req, res, next) => {
//   const { taskName, user } = req.body;

//   const verifyUser = await User.findOne({ email: user });

//   if (!verifyUser)
//     return req.flash('error_msg', 'You are now registered and can log in');
//     // next(new AppError('User not found with that email!', 404));

//   const newTask = await Task.create({ taskName, user });

//   res.status(201).json(newTask);
// });

// get one taks
exports.getTask = catchAsync(async (req, res, next) => {
  const task = await Task.findById(req.params.id);

  if (!task) req.flash('error_msg', 'Task not found with ID!');

  const discusses = await Discuss.find({ taskId: task.id });

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  // todays day
  const day = weekdays[new Date().getDay()];

  const errorMsg = req.flash('wrong')[0]

  const requestedUser = req.user.email;
  return res.render('common/taskDiscussPage.ejs', {
    task,
    discusses,
    requestedUser,
    day,
    wrong: errorMsg,
  });
});

// get all tasks
exports.getAllTasks = catchAsync(async (req, res, next) => {
  const tasks = await Task.find().sort({ createdAt: -1 });

  // SEND RESPONSE
  // res.status(200).json(tasks);

  res.render('admin/tasksInfo.ejs', {
    userName: req.user.name,
    tasks,
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
