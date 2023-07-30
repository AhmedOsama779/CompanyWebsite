const util = require("util");
const fs = require("fs");

class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  async createUser(req, res) {
    try {
      const errors = req.validationErrors();
      if (!errors) {
        return res.status(400).json({ errors: "error" });
      }

      if (!req.file) {
        return res.status(400).json({
          errors: [
            {
              msg: "File is Required",
            },
          ],
        });
      }

      // INSERT NEW User
      const userData = {
        FullName: req.body.FullName,
        email: req.body.email,
        Address: req.body.Address,
        Phone: req.body.Phone,
        EducationalLevel: req.body.EducationalLevel,
        Grade: req.body.Grade,
        AdditionalInfo: req.body.AdditionalInfo,
        internshipId: req.body.internshipId,
        file: req.file.filename
      };

      await this.userService.createUser(userData);

      res.status(200).json({
        msg: "User created successfully",
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ errors: ["Internal server error"] });
    }
  }
}
module.exports = UserController;
