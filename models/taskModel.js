const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  taskName: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    ref: 'User',
    required: [true, 'Task must belong to a user.'],
  },
  progress: {
    type: String,
    default: 0,
    required: [true, 'Task must have a progress'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
