const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Catch Async Error
const catchAsync = require('../utils/catchAsync');

// Global Error Handler
const AppError = require('../utils/appError');

// Models
const User = require('../models/userModel');
const Task = require('../models/taskModel');

// create user
exports.createUser = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  //   Simple validation
  if (!name || !email || !password) {
    return next(new AppError('Please enter all fields 🙂', 400));
  }

  // Check for existing user
  User.findOne({ email }).then(user => {
    if (user) {
      return next(
        new AppError(
          'Sorry. A user with that email address already exists, or the email was invalid.',
          400
        )
      );
    }

    const newUser = new User({
      name,
      email,
      password,
    });

    // Create salt & Hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then(user => {
          jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;

              return res.status(201).json({
                success: 'User added',
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                  role: user.role,
                },
              });
            }
          );
        });
      });
    });
  });

  // next();
});

// get all users excluding admin data and password field
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find({ role: { $ne: 'admin' } })
    .sort({ createdAt: -1 })
    .select('-password');

  // SEND RESPONSE
  res.status(200).json(users);
});

// delete one user by email
exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) return next(new AppError('No user found with that ID', 404));

  res.status(200).json({ msg: 'User deleted!' });
});

// assign task to a user
exports.assignTask = catchAsync(async (req, res, next) => {
  const { taskName, user } = req.body;

  const verifyUser = await User.findOne({ email: user });

  if (!verifyUser)
    return next(new AppError('User not found with that email!', 404));

  const newTask = await Task.create({ taskName, user });

  res.status(201).json(newTask);
});

// get all tasks
exports.getAllTasks = catchAsync(async (req, res, next) => {
  const tasks = await Task.find().sort({ createdAt: -1 });

  // SEND RESPONSE
  res.status(200).json(tasks);
});

// update a task by id
exports.updateTask = catchAsync(async (req, res, next) => {
  const { taskName, user } = req.body;

  // console.log(taskName, user);

  if (!taskName || !user)
    return next(new AppError('Please enter all fields 🙂', 400));

  const verifyUser = await User.findOne({ email: user });

  if (!verifyUser)
    return next(new AppError('User not found with that email!', 404));

  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    return next(new AppError('No task found with that ID', 404));
  }

  res.status(200).json({ msg: 'Task Updated!' });
});

// delete one tasks by id
exports.deleteTask = catchAsync(async (req, res, next) => {
  // console.log(req.params.id);
  const task = await Task.findByIdAndDelete(req.params.id);

  if (!task) return next(new AppError('No task found with that ID', 404));

  res.status(200).json({ msg: 'Task deleted!' });
});
