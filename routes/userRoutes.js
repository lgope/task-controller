import express from 'express';
const router = express.Router();
import * as userController from '../controllers/userController.js';
import { auth, ensureUser } from '../middleware/auth.js';
// @route GET api/user/
// @desc Get All User task
// @access only For user and Private
router.get('/', auth, ensureUser, userController.getUserTasks);

export default router;
