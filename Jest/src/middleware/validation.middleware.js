const { body } = require("express-validator");

const registerUserValidationRules = () => {
    return [
        body("username")
            .notEmpty()
            .withMessage("Username is required")
            .isLength({ min: 3 })
            .withMessage("Username must be at least 3 characters"),

        body("email")
            .notEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Please provide a valid email"),

        body("password")
            .notEmpty()
            .withMessage("Password is required")
            .isLength({ min: 6 })
            .withMessage("Password must be at least 6 characters")
    ];
};

module.exports = {
    registerUserValidationRules
};