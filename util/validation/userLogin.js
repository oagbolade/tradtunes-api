const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateLoginInput(data) {
  let errors = {};
  // console.log(data);
  // data.emailOrPhoneNumber = !isEmpty(data.emailOrPhoneNumber)
  //   ? data.emailOrPhoneNumber
  //   : "";
  // data.password = !isEmpty(data.password) ? data.password : "";

  if (Validator.isEmpty(data.emailOrPhoneNumber)) {
    errors.emailOrPhoneNumber = "Email or phone number field is required";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
