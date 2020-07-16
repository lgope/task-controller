const express = require('express');
const router = express.Router();
const discussController = require('../controllers/discussController');
const { ensureAuthenticated } = require('../config/authConfig');


// @route GET api/discuss/
// @desc Get All discuss task
// @access only For user, admin and Private
router.post('/', ensureAuthenticated, discussController.discuss);


// @route DELETE api/discuss/
// @desc DELETE All discuss task
// @access only For user, admin and Private
router.delete('/delete/:id', ensureAuthenticated, discussController.deleteDiscuss);
module.exports = router;