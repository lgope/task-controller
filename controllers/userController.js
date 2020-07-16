// Catch Async Error
const catchAsync = require('../utils/catchAsync');

// Global Error Handler

// Models
const User = require('../models/userModel');
const Task = require('../models/taskModel');
const Discuss = require('../models/discussModel');
// get all user tasks
exports.getAllTasks = catchAsync(async (req, res, next) => {
  // find user by id
  const user = await User.findById(req.user.id);

  // if user not found
  if (!user) return req.flash('error_msg', 'User not found!');

  // get all task by user email
  const tasks = await Task.find({ user: user.email }).sort({ createdAt: -1 });

  // tasks.discuss = [];

  // const discusses = await Discuss.find({taskId: "5f0e8a47b70f2134fc08c1bd"});

  // tasks.map(task => console.log(task.id))

  // tasks.discuss.push(discusses)
  // console.log(discusses);

  // SEND RESPONSE
  //   res.status(200).json(tasks);
  console.log(tasks);
  res.render('user/userHomePage.ejs', {
    pageTitle: `User Panel`,
    userName: req.user.name,
    tasks,
  });
});
