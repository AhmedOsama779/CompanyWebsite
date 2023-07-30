const { body, validationResult } = require("express-validator");

class InternValidator {
  static validate() {
    return [
      body("InternshipName").isString().withMessage("please enter a valid intern name"),
      body("InternshipEnvironment").isString(),
      body("InternshipTime").isString(),
      body("InternshipResponsability").isString(),
      (req, res, next) => {
        const errors = validationResult(req);
        req.validationErrors = () => errors.array();
        next();
      },
    ];
  }
}

module.exports = InternValidator;
