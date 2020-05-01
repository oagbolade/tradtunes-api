const express = require('express');
const router = express.Router();

//Paystack to handle payments
router.use('/pay', require('./paystack'));

//Facebook Auth routes
router.use('/auth', require('./facebookauth'));

//user routes
router.use('/user', require('./user'));

//artist routes
router.use('/artist', require('./artist'));

//admin routes
router.use('/admin', require('./admin'));

//super admin routes
router.use('/superAdmin', require('./firstLevelAdmin'));

//videoCat  routes
router.use('/videoCat', require('./videoCat'));

//audioCat  routes
router.use('/audioCat', require('./audioCat'));

//video  routes
router.use('/video', require('./video'));

//audio  routes
router.use('/audio', require('./audio'));

//audio  routes
router.use('/album', require('./album'));

module.exports = router;
