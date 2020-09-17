const express = require('express');
const taskController = require('../controllers/taskController');
const { auth, ensureAdmin, ensureUser } = require('../middleware/auth');

const router = express.Router();

router.use(auth);
// @route GET api/user/
// @desc Get All User task
// @access only For user and Private
router
  .route('/get-all-task')
  .get(ensureAdmin, taskController.getAllTasks);

router.get('/:id', taskController.getTask);

// @route POST api/admin/assign-task
// @desc Create An assign task
// @access only For Admin and Private
router.post('/assign-task', ensureAdmin, taskController.assignTask);

// @route GET api/task/get-works-by-date
// @desc get-all-work
// @access only For Admin and Private
router.get(
  '/get-tasks-by-date/:userEmail/:fromDate/:toDate',
  taskController.getTasksByDate
);

router.patch('/update-task/:id', ensureUser, taskController.updateTask)

module.exports = router;