const isEmpty = require('./isEmpty');

module.exports = function validatePostInput(data) {
    let errors = {};


    if (!data) {
        errors.video = 'media Empty';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};