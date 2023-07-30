const { body, validationResult } = require("express-validator");

class EmployeeValidator {
  static validate() {
    return [
      body("name").isString().withMessage("please enter a valid employee name"),
      body("age").isNumeric().withMessage("Please enter a valid age"),
      body("job").isString().withMessage("Please enter a valid Job"),
      body("position").isString().withMessage("Please enter a valid position"),
      body("salary").isNumeric().withMessage("Please enter a valid salary"),
      body("facebookLink").isURL(),
      body("githubLink").isURL(),
      (req, res, next) => {
        const errors = validationResult(req);
        req.validationErrors = () => errors.array();
        next();
      },
    ];
  }
}

module.exports = EmployeeValidator;
