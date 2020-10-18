import express from 'express';
import * as dailyWorkController from '../controllers/dailyWorkController.js';
import { auth, ensureAdmin, ensureUser } from '../middleware/auth.js';

const router = express.Router();

router.use(auth);
// @route POST api/daily-work/save-today-work
// @desc Create An save-today-work
// @access only For Private
router.post('/save-today-work', dailyWorkController.saveDailyWork);

// @route GET api/daily-work/get-all-work
// @desc get-all-work
// @access only For Admin and Private
router.get('/get-all-work', ensureAdmin, dailyWorkController.getAllDailyWorks);

// @route GET api/daily-work/get-works-by-date
// @desc get-all-work
// @access only For Admin and Private
router.get(
  '/get-works-by-date/:userId/:fromDate/:toDate',
  dailyWorkController.getDailyWorksByDate
);

router.get(
  '/get-works-by-date/:fromDate/:toDate',
  dailyWorkController.getDailyWorksByDate
);

// @route GET api/daily-work/get-all-work
// @desc get-all-work
// @access only For Admin and Private
router.get(
  '/get-user-works/:id',
  ensureUser,
  dailyWorkController.getUserDailyWorks
);

// @route PATCH api/daily-work/update-work/:id
// @desc get-all-work
// @access only For User and Private
// router.get(
//   '/get-user-works/:id',
//   ensureUser,
//   dailyWorkController.updateDailyWork
// );

router.patch('/update-dailyWork/:id', dailyWorkController.updateDailyWork);

router.delete('/delete-dailyWork/:id', dailyWorkController.deleteDailyWork);

export default router;
