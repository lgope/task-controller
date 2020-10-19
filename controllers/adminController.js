// Catch Async Error
import catchAsync from '../utils/catchAsync.js';

// Global Error Handler
import AppError from '../utils/appError.js';

// Models
import User from '../models/userModel.js';
// import Task from '../models/taskModel'

// create user
export const createUser = catchAsync(async (req, res, next) => {
  const { name, designation, email, password } = req.body;

  //   Simple validation
  if (!name || !designation || !email || !password) {
    return next(new AppError('Please enter all fields!', 400));
  }

  const user = await User.findOne({ email });
  if (user) {
    return next(
      new AppError(
        'Sorry. A user with that email address already exists, or the email was invalid.',
        400
      )
    );
  }

  const newUser = await User.create({ name, designation, email, password });

  if (!newUser) {
    return next(
      new AppError('Something wrong To add new user! Try again.', 400)
    );
  }

  return res.status(201).json({
    status: 'success',
    newUser,
  });
});

// get all users excluding admin data and password field
export const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find({ role: { $ne: 'admin' } })
    .sort({ createdAt: -1 })
    .select('-password');

  if (!users) return next(new AppError('No users found!', 404));

  // SEND RESPONSE
  return res.status(200).json({
    status: 'success',
    users,
  });
});
