const express = require('express');
const router = express.Router();
const {auth, ensureAdmin} = require('../middleware/auth');

// User controller
const adminController = require('../controllers/adminController');

// @route GET api/Users
// @desc Get All Users
// @access Public

router.get('/get-all-user', auth, ensureAdmin, adminController.getAllUsers);

// @route POST api/Users
// @desc Create An User
// @access For now Private
router.post('/create-user', auth, ensureAdmin, adminController.createUser);

// @route DELETE api/Users
// @desc Delete An User
// @access For now Private
// router.delete('/:id', auth, UserController.deleteUser);

module.exports = router;
