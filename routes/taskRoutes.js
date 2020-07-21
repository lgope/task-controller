const express = require('express');
const taskController = require('../controllers/taskController');
const { auth, ensureAdmin, ensureUser } = require('../middleware/auth');

const router = express.Router();

// @route GET api/user/
// @desc Get All User task
// @access only For user and Private
router
  .route('/get-all-task')
  .get(auth, ensureAdmin, taskController.getAllTasks);

router.get('/:id', auth, taskController.getTask);
// router.route('/tour-stats').get(tourController.getTourStats);
// @route POST api/admin/assign-task
// @desc Create An assign task
// @access only For Admin and Private
router.post('/assign-task', auth, ensureAdmin, taskController.assignTask);

router.put('/progress-update/:id', auth, ensureUser, taskController.updateProgress)

module.exports = router;
