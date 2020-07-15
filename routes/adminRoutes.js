const express = require('express');
const router = express.Router();
const { auth, ensureAdmin } = require('../middleware/auth');

// User controller
const adminController = require('../controllers/adminController');

// @route GET api/admin/get-all-users
// @desc Get All Users
// @access only For Admin and Private
router.get('/get-all-user', auth, ensureAdmin, adminController.getAllUsers);

// @route POST api/admin/create-user
// @desc Create An User
// @access only For Admin and Private
router.post('/create-user', auth, ensureAdmin, adminController.createUser);

// @route DELETE api/admin/:id
// @desc Delete An User
// @access only For Admin and Private
router.delete('/:id', auth, ensureAdmin, adminController.deleteUser);

// @route POST api/admin/assign-task
// @desc Create An assign task
// @access only For Admin and Private
router.post('/assign-task', auth, ensureAdmin, adminController.assignTask);

// @route GET api/admin/get-all-tasks
// @desc Get All Users
// @access only For Admin and Private
router.get('/get-all-task', auth, ensureAdmin, adminController.getAllTasks);

// @route PATCH api/admin/update-task/:id
// @desc patch A task
// @access only For Admin and Private
router.patch('/update-task/:id', auth, ensureAdmin, adminController.updateTask);

// @route DELETE api/admin/delete-task/:id
// @desc Delete An User
// @access only For Admin and Private
router.delete(
  '/delete-task/:id',
  auth,
  ensureAdmin,
  adminController.deleteTask
);

module.exports = router;
