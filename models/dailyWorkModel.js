const mongoose = require('mongoose');

const dailyWorkSchema = new mongoose.Schema({
  userId: {
    type: String,
    ref: 'User',
    required: [true, 'Daily work must belong to a user.'],
  },
  title: {
    type: String,
    ref: 'Task',
    required: [true, 'Daily work must have a title.'],
  },
  description: {
    type: String,
    required: [true, 'Daily work must have a description.'],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const DailyWork = mongoose.model('DailyWork', dailyWorkSchema);
module.exports = DailyWork;
