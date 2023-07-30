const { body, validationResult } = require("express-validator");

class ProjectValidator {
  static validate() {
    return [
        body("collectionName").isString().withMessage("please enter a valid employee name"),
      (req, res, next) => {
        const errors = validationResult(req);
        req.validationErrors = () => errors.array();
        next();
      },
    ];
  }
}

module.exports = ProjectValidator;