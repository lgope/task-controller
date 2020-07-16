const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { ensureAuthenticated, ensureUser } = require('../config/authConfig');

// @route GET api/user/
// @desc Get All User task
// @access only For user and Private
router.get('/', ensureAuthenticated, ensureUser, userController.getAllTasks);

module.exports = router;
