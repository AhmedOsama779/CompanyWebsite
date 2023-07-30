const { body, validationResult } = require("express-validator");

class UserValidator {
  static validate() {
    return [
      body("FullName").isString().withMessage("please enter a valid name"),
      body("email").isString(),
      body("Address").isString(),
      body("Phone").isNumeric(),
      body("EducationalLevel").isString(),
      body("Grade").isString(),
      body("AdditionalInfo").isString(),
      body("internshipId").isString(),
      (req, res, next) => {
        const errors = validationResult(req);
        req.validationErrors = () => errors.array();
        next();
      },
    ];
  }
}

module.exports = UserValidator;
