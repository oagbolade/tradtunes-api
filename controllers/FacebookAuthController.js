const keys = require("../config/keys");
var models = require("../models");
const Facebook_auth = models.facebookauth;
const jwtUser = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const ChangePasswordValidation = require("../util/validation/changePassword");
const Validator = require("validator");

const validateRegisterInput = require("../util/validation/facebookAuthValidation");
const validateLoginInput = require("../util/validation/userLogin");
const validateUpdateProfileInput = require("../util/validation/userProfileUpdate");

exports.UserRegister = (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const newUser = {
    name: req.body.name,
    email: req.body.email
  };

  Facebook_auth.findOne({
    where: {
      email: req.body.email
    }
  }).then(user => {
    if (user) {
      // If user already exists, return user and continue with auth
      return res.json(user);
    } else {
      Facebook_auth.create(newUser)
        .then(user => res.json(user))
        .catch(err => console.log(err));
    }
  });
};

// Upload picture
// Delete profile
// Update profile
