// assign task to a user
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';
import moment from 'moment';
import * as factory from './handlerFactory.js';
import Task from '../models/taskModel.js';

// assign task
export const assignTask = factory.createOne(Task);

// get one task
export const getTask = catchAsync(async (req, res, next) => {
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
export const getAllTasks = factory.getAll(Task);
// update task
export const updateTask = factory.updateOne(Task);
// delete task by id
export const deleteTask = factory.deleteOne(Task);

// filter task by date
export const getTasksByDate = catchAsync(async (req, res, next) => {
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
