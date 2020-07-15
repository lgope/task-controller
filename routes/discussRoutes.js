const express = require('express');
const router = express.Router();
const discussController = require('../controllers/discussController');
const { auth } = require('../middleware/auth');


// @route GET api/discuss/
// @desc Get All discuss task
// @access only For user, admin and Private
router.post('/', auth, discussController.discuss);

module.exports = router;