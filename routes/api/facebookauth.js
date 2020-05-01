const express = require('express');
const router = express.Router();
const FacebookAuthController = require("../../controllers/FacebookAuthController");
const passport = require('passport');
const parser = require('../../util/cloudinaryImageUpload')
const PlayListController = require('../../controllers/PlayListController');

// @route   Post api/facebookauth/register
// @desc    Register new user or login user with facebook auth
// @access  Public
router.post("/facebookauth/register", FacebookAuthController.UserRegister);

// Update profile
// Upload profile picture
// Delete profile
module.exports = router;