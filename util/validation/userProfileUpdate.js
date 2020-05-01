const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validatorRegisterInput(data) {
  let errors = {};
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.phone = !isEmpty(data.email) ? data.phone : "";

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 3 and 30 characters";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name  field is required";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  if (!Validator.isEmpty(data.phone)) {
    if (!Validator.isLength(data.phone, { min: 11, max: 11 })) {
      errors.phone = "Phone number must be 11 characters";
    }

    if (!Validator.isNumeric(data.phone)) {
      errors.phone = "Phone number is invalid";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
