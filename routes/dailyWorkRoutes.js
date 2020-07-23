const express = require('express');
const dailyWorkController = require('../controllers/dailyWorkController');
const { auth, ensureAdmin, ensureUser } = require('../middleware/auth');

const router = express.Router();

// @route POST api/daily-work/save-today-work
// @desc Create An save-today-work
// @access only For Private
router.post('/save-today-work', auth, dailyWorkController.saveDailyWork);

// @route GET api/daily-work/get-all-work
// @desc get-all-work
// @access only For Admin and Private
router.get(
  '/get-all-work',
  auth,
  ensureAdmin,
  dailyWorkController.getAllDailyWorks
);

// @route GET api/daily-work/get-all-work
// @desc get-all-work
// @access only For Admin and Private
router.get(
  '/get-user-works/:id',
  auth,
  ensureUser,
  dailyWorkController.getUserDailyWorks
);
module.exports = router;
