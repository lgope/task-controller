const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const {
  ensureAuthenticated,
  ensureUser,
  ensureAdmin,
} = require('../config/authConfig');

router.get(
  '/get-all-task',
  ensureAuthenticated,
  ensureAdmin,
  taskController.getAllTasks
);
// @route GET api/user/
// @desc Get All User task
// @access only For user and Private
router.get('/:id', ensureAuthenticated, taskController.getTask);


module.exports = router;
