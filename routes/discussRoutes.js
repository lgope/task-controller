const express = require('express');
const router = express.Router();
const discussController = require('../controllers/discussController');
const { auth } = require('../middleware/auth');

// @route GET api/discuss/
// @desc Get All discuss task
// @access only For user, admin and Private
router.post('/', auth, discussController.discuss);

// not gonna work coz anyone can get any discuss
// router.get('/:taskId', auth, discussController.getDiscuss);

module.exports = router;
