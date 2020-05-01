const express = require('express');
const router = express.Router();
const AdminController = require('../../controllers/FirstLevelAdmin')
const passport = require('passport');



// @route   GET api/superAdmin/login
// @desc    Login Admin / Returning jwtAdmin Token
// @access  Public
router.post('/login', AdminController.AdminLogin)

// @route   Post api/superAdmin/register
// @desc    Returns current Admin
// @access  Private
router.get('/current',
    passport.authenticate('firstLevelAdmin', {
        session: false
    }), AdminController.ReturnAdmin)

module.exports = router;