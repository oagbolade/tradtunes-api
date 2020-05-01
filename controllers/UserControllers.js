const keys = require("../config/keys");
var models = require("../models");
const User = models.User;
const jwtUser = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const ChangePasswordValidation = require("../util/validation/changePassword");
const Validator = require("validator");

const validateRegisterInput = require("../util/validation/userRegister");
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
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone
  };

  User.findOne({
    where: {
      [Op.or]: [{ email: req.body.email }, { phone: req.body.phone }]
    }
  }).then(user => {
    if (user) {
      return res.status(400).json({
        error: "User already exists"
      });
    } else {
      User.create(newUser)
        .then(user => res.json(user))
        .catch(err => console.log(err));
    }
  });
};

exports.UserLogin = (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  let isEmailValid = email => {
    if (!Validator.isEmail(email)) {
      return res.status(400).json({
        email: "Email is invalid"
      });
    }
  };

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const emailOrPhoneNumber = req.body.emailOrPhoneNumber;
  const password = req.body.password;

  let checkEmailOrPhoneNumber = null;

  if (Validator.isNumeric(emailOrPhoneNumber)) {
    checkEmailOrPhoneNumber = User.findOne({
      where: {
        phone: emailOrPhoneNumber
      }
    });
  } else {
    isEmailValid(emailOrPhoneNumber);
    checkEmailOrPhoneNumber = User.findOne({
      where: {
        email: emailOrPhoneNumber
      }
    });
  }

  checkEmailOrPhoneNumber.then(user => {
    // Check for user
    if (!user) {
      return res.status(404).json({
        error: "user not found"
      });
    }
    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // user Matched
        const payload = {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          avatar: user.avatar
        }; // Create jwtUser Payload

        // Sign Token
        jwtUser.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 18000
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res.status(400).json({
          error: "Password incorrect"
        });
      }
    });
  });
};

exports.UploadPicture = (req, res) => {
  User.findOne({
    where: {
      id: req.body.id
    }
  })
    .then(user => {
      user
        .update({
          avatar: req.file.url
        })
        .then(user => {
          res.json(user);
        });
    })
    .catch(err =>
      res.status(404).json({
        image: "No image found found"
      })
    );
};

exports.UpdateUser = (req, res) => {
  const { errors, isValid } = validateUpdateProfileInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({
    where: {
      id: req.body.id
    }
  })
    .then(user => {
      if (user) {
        user
          .update({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone
          })
          .then(user => {
            res.json(user);
          });
      } else {
        res.status(404).json({
          user: "No user found"
        });
      }
    })
    .catch(err =>
      res.status(404).json({
        error: "profile not updated"
      })
    );
};

exports.ReturnUser = (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    avatar: req.user.avatar
  });
};

exports.AllUser = (req, res) => {
  User.findAll()
    .then(user => res.json(user))
    .catch(err =>
      res.status(404).json({
        nouserfound: "No user found"
      })
    );
};

exports.SoftDelUser = (req, res) => {
  User.findOne({
    where: {
      id: req.params.id
    }
  }).then(user => {
    if (user !== null) {
      user
        .destroy()
        .then(() => {
          res.json({
            success: true
          });
        })
        .catch(err => {
          res.status(404).json({
            error: "something went wrong"
          });
        });
    }
  });
};

exports.SoftDelUser2 = (req, res) => {
  User.findOne({
    where: {
      id: req.body.id
    }
  }).then(user => {
    if (user !== null) {
      user
        .destroy()
        .then(() => {
          res.json({
            success: true
          });
        })
        .catch(err => {
          res.status(404).json({
            error: "something went wrong"
          });
        });
    }
  });
};

exports.UndoSoftdelUser = (req, res) => {
  User.findOne({
    where: {
      id: req.params.id
    },
    paranoid: false
  }).then(user => {
    if (user !== null) {
      user.restore();
      res.json({
        success: true
      });
    } else {
      res.status(404).json({
        nouserfound: "user not found"
      });
    }
  });
};
exports.RetrieveUserById = (req, res) => {
  User.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ nouserfound: "No user found with that ID" });
      }
    })
    .catch(err =>
      res.status(404).json({
        nouserfound: "No user found"
      })
    );
};

exports.ChangePassword = (req, res) => {
  const { errors, isValid } = ChangePasswordValidation(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const password1 = req.body.password1;
  const newUser = {
    password: req.body.password
  };

  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(User => {
    bcrypt.compare(password1, User.password).then(isMatch => {
      if (isMatch) {
        // User Matched
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            -User.update(newUser)
              .then(User => res.json(User))
              .catch(err => console.log(err));
          });
        });
      }
    });
  });
};
