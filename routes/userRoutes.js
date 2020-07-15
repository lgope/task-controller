const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { auth, ensureUser } = require('../middleware/auth');

// @route GET api/user/
// @desc Get All User task
// @access only For user and Private
router.get('/', auth, ensureUser, userController.getAllTasks);

module.exports = router;
