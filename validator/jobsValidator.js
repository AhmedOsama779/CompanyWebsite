const { body, validationResult } = require("express-validator");

class JobValidator {
  static validate() {
    return [
      body("jobName").isString().withMessage("please enter a valid job name"),
      body("jobEnvironment").isString(),
      body("jobTime").isString(),
      body("jobResponsability").isString(),
      body("requirments").isString(),
      body("jobType").isString(),
      body("jobLocation").isString(),
      (req, res, next) => {
        const errors = validationResult(req);
        req.validationErrors = () => errors.array();
        next();
      },
    ];
  }
}

module.exports = JobValidator;
