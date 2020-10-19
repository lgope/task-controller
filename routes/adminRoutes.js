import express from 'express';
const router = express.Router();
import { auth, ensureAdmin } from '../middleware/auth.js';

// User controller
import * as adminController from '../controllers/adminController.js';

// @route GET api/admin/get-all-users
// @desc Get All Users
// @access only For Admin and Private
// router.get('/', ensureAuthenticated, ensureAdmin, adminController.getHome);

// @route GET api/admin/get-all-users
// @desc Get All Users
// @access only For Admin and Private
router.get('/get-all-user', auth, ensureAdmin, adminController.getAllUsers);

// router.get('/user-info', ensureAuthenticated, ensureAdmin, adminController.getAllUsers);

// @route POST api/admin/create-user
// @desc Create An User
// @access only For Admin and Private
router.post('/create-user', auth, ensureAdmin, adminController.createUser);

// @route DELETE api/admin/:id
// @desc Delete An User
// @access only For Admin and Private
// router.delete('/:id', ensureAuthenticated, ensureAdmin, adminController.deleteUser);

// @route POST api/admin/assign-task
// @desc Create An assign task
// @access only For Admin and Private
// router.post('/assign-task', ensureAuthenticated, ensureAdmin, adminController.assignTask);

// @route GET api/admin/get-all-tasks
// @desc Get All Users
// @access only For Admin and Private
// router.get('/get-all-task', ensureAuthenticated, ensureAdmin, adminController.getAllTasks);

// @route PATCH api/admin/update-task/:id
// @desc patch A task
// @access only For Admin and Private
// router.patch('/update-task/:id', ensureAuthenticated, ensureAdmin, adminController.updateTask);

// @route DELETE api/admin/delete-task/:id
// @desc Delete An User
// @access only For Admin and Private
// router.delete(
//   '/delete-task/:id',
//   ensureAuthenticated,
//   ensureAdmin,
//   adminController.deleteTask
// );

export default router;
