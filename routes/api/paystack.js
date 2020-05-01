const express = require("express");
const router = express.Router();
const passport = require("passport");
const PaystackController = require("../../controllers/PaystackController");

// @route   Post api/pay/paystack/initialise
// @desc    Initialise user payments
// @access  Private
router.post(
  "/paystack/initialise",
  passport.authenticate("user", {
    session: false
  }),
  PaystackController.InitialisePayments
);

// @route   Post api/pay/paystack/verify/:reference
// @desc    Verify user payments
// @access  Private
router.get(
  "/paystack/verify/:reference",
  passport.authenticate("user", {
    session: false
  }),
  PaystackController.VerifyPayments
);

module.exports = router;
