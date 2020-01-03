const validator = require('validator');

function validateName(name) {
    return validator.isEmpty(name);
}

function validateEmail(email) {
    return validator.isEmail(email);
}

function validatePassword(password) {
    return validator.isEmpty(password);
}

module.exports = { validateName, validateEmail, validatePassword }