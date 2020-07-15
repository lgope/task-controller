const mongoose = require('mongoose');

const discussSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    ref: 'User',
    required: [true, 'Discuss must belong to a user.'],
  },
  taskId: {
    type: String,
    ref: 'Task',
    required: [true, 'Discuss must belong to a Task.'],
  },
  body: {
    type: String,
    required: [true, 'Discuss must have a body.'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Discuss = mongoose.model('Discuss', discussSchema);
module.exports = Discuss;
