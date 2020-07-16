// Catch Async Error
const catchAsync = require('../utils/catchAsync');

// Global Error Handler

// Models
const User = require('../models/userModel');
const Task = require('../models/taskModel');
const Discuss = require('../models/discussModel');

// get all discusses
exports.discuss = async (req, res, next) => {
  try {
    const { taskId, body } = req.body;

    console.log(taskId, body, req.user);

    if (!taskId || body.length <= 0) {
      req.flash('wrong', 'Please enter Something!');
      return res.redirect('back');
    }

    //   find user by id
    const user = await User.findById(req.user._id);

    //   if user not found
    if (!user) {
      req.flash('wrong', 'User not found!');
      return res.redirect('back');
    }

    const task = await Task.findOne({ _id: taskId });

    if (!task) {
      req.flash('wrong', 'Task not found with that ID');
      return res.redirect('back');
    }

    const newDiscuss = await Discuss.create({
      userEmail: user.email,
      taskId,
      body,
    });

    res.redirect('back');
  } catch (error) {
    req.flash('wrong', error);
    return res.redirect('back');
  }
};

exports.deleteDiscuss = catchAsync(async (req, res, next) => {
  const discuss = await Discuss.findByIdAndDelete(req.params.id);

  if (!discuss) {
    req.flash('wrong', 'No Discuss!');
    return res.redirect('back');
  }

  res.redirect('back');
});
